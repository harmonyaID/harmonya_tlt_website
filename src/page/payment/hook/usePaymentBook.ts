'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'
import {
    GuestyBooking,
    clearBooking,
    loadBooking,
} from '@/helper/guestyBooking.helper'
import {
    addGuestGuestyV2,
    addPaymentMethodGuestyV2,
    addReservationFromQuoteGuestyV2,
    addReservationPaymentGuestyV2,
    getPaymentProviderListingGuestyV2,
} from '@/service/api/guesty/guestyv2.api'
import { THANK_YOU_GUESTY } from '@/config/pagePath.config'

const TOKENIZATION_SCRIPT = 'https://pay.guesty.com/tokenization/v3/init.js'
export const CARD_CONTAINER_ID = 'guesty-tokenization-container'

const initForm = {
    firstName: '',
    email: '',
    phone: '',
    specialRequest: '',
    paymentMethod: 'credit_card', // 'credit_card' | 'bank_transfer'
    isAcceptPolicy: false,
    isAcceptPromo: false,
}

// SDK Guesty wajib dimuat dari pay.guesty.com (PCI), tidak boleh di-bundle
const loadTokenizationSdk = (): Promise<any> =>
    new Promise((resolve, reject) => {
        const w = window as any
        if (w.guestyTokenization) return resolve(w.guestyTokenization)

        const script = document.createElement('script')
        script.src = TOKENIZATION_SCRIPT
        script.async = true
        script.onload = () =>
            w.guestyTokenization
                ? resolve(w.guestyTokenization)
                : reject(new Error('Payment form failed to load'))
        script.onerror = () => reject(new Error('Payment form failed to load'))
        document.head.appendChild(script)
    })

const splitName = (full: string) => {
    const parts = full.trim().split(/\s+/)
    const firstName = parts[0] || ''
    return { firstName, lastName: parts.slice(1).join(' ') || firstName }
}

const apiError = (err: any) =>
    err?.response?.data?.error?.message ||
    err?.response?.data?.message ||
    err?.message ||
    'Something went wrong. Please try again.'

const usePaymentBook = () => {
    const router = useRouter()
    const [formRequest, setFormRequest] = useState<any>({ ...initForm })
    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const [booking, setBooking] = useState<GuestyBooking | null>(null)
    const [isReady, setIsReady] = useState(false) // sessionStorage sudah dibaca
    const [providerId, setProviderId] = useState('')
    const [isCardValid, setIsCardValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const sdkRef = useRef<any>(null)

    const isCard = formRequest.paymentMethod === 'credit_card'

    useEffect(() => {
        setBooking(loadBooking())
        setIsReady(true)
    }, [])

    // Payment provider milik listing (dibutuhkan form kartu)
    useEffect(() => {
        if (!booking?.listingId) return
        getPaymentProviderListingGuestyV2(booking.listingId)
            .then((res) => {
                const d = res?.data || {}
                setProviderId(d.paymentProviderId || d._id || '')
            })
            .catch((err) => setError(apiError(err)))
    }, [booking?.listingId])

    // Render form kartu Guesty ke dalam container saat metode = credit card
    useEffect(() => {
        if (!isCard || !providerId) return
        let cancelled = false

        loadTokenizationSdk()
            .then(async (sdk) => {
                if (cancelled) return
                sdkRef.current = sdk
                await sdk.render({
                    containerId: CARD_CONTAINER_ID,
                    providerId,
                    onStatusChange: (valid: boolean) => setIsCardValid(valid),
                })
            })
            .catch((err) => !cancelled && setError(apiError(err)))

        return () => {
            cancelled = true
            setIsCardValid(false)
            try {
                sdkRef.current?.destroy?.()
            } catch {}
        }
    }, [isCard, providerId])

    const _validate = () => {
        if (!formRequest.firstName.trim()) return 'Please enter your name.'
        if (!formRequest.email.trim()) return 'Please enter your email.'
        if (!formRequest.phone) return 'Please enter your phone number.'
        if (!formRequest.isAcceptPolicy)
            return 'Please accept the Privacy Policy and Terms.'
        if (isCard && !isCardValid) return 'Please complete your card details.'
        return ''
    }

    const _handleSubmit = async () => {
        if (!booking || isLoading) return

        const invalid = _validate()
        if (invalid) return setError(invalid)

        setIsLoading(true)
        setError('')

        const { firstName, lastName } = splitName(formRequest.firstName)

        try {
            // 1. Tokenisasi kartu dulu: kalau kartu gagal, belum ada data dibuat
            let cardToken = ''
            if (isCard) {
                const pm = await sdkRef.current.submit({
                    amount: booking.total,
                    currency: booking.currency,
                    listingId: booking.listingId,
                    quoteId: booking.quoteId,
                    guest: {
                        firstName,
                        lastName,
                        email: formRequest.email,
                        phone: formRequest.phone,
                    },
                    method: 'verify_no_3ds', // 3DS ditangani saat charge
                })
                cardToken = pm?._id
                if (!cardToken) throw new Error('Card could not be verified.')
            }

            // 2. Guest
            const guestRes = await addGuestGuestyV2({
                firstName,
                lastName,
                email: formRequest.email,
                phone: formRequest.phone,
            })
            const guestId = guestRes.data?._id
            if (!guestId) throw new Error('Unable to create guest.')

            // 3. Simpan kartu ke guest
            let paymentMethodId = ''
            if (isCard) {
                const pmRes = await addPaymentMethodGuestyV2(guestId, {
                    _id: cardToken,
                    paymentProviderId: providerId,
                })
                paymentMethodId = pmRes.data?._id
                if (!paymentMethodId)
                    throw new Error('Unable to save payment method.')
            }

            // 4. Reservasi dari quote
            const reservationRes = await addReservationFromQuoteGuestyV2({
                quoteId: booking.quoteId,
                ratePlanId: booking.ratePlanId,
                guestId,
                // Kartu -> confirmed setelah dibayar; transfer -> hold 48 jam
                status: isCard ? 'confirmed' : 'reserved',
                ...(isCard ? {} : { reservedUntil: 48 }),
                ignoreCalendar: false,
                ignoreTerms: false,
                ignoreBlocks: false,
            })
            const reservationId = reservationRes.data?.reservationId
            if (!reservationId) throw new Error('Unable to create reservation.')

            // 5. Charge kartu
            if (isCard) {
                const payRes = await addReservationPaymentGuestyV2(
                    reservationId,
                    {
                        paymentMethod: {
                            method: 'AMARYLLIS', // GuestyPay
                            id: paymentMethodId,
                        },
                        amount: booking.total,
                    },
                )

                // 3DS: SDK menampilkan challenge sendiri
                const challenge =
                    payRes.data?.threeDSChallenge ||
                    payRes.data?.payment?.threeDSChallenge
                if (challenge) {
                    await sdkRef.current.handle3DSChallenge({
                        threeDSChallenge: challenge,
                    })
                }
            }

            clearBooking()
            router.push(THANK_YOU_GUESTY)
        } catch (err: any) {
            setError(apiError(err))
            setIsLoading(false)
        }
    }

    return {
        formRequest,
        setFormRequest,
        _handleChange: nestedForm.__handleChange,
        _handleSubmit,
        booking,
        isReady,
        isCard,
        isLoading,
        error,
    }
}

export default usePaymentBook
