'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'
import {
    BOOKING_STORAGE_KEY,
    GuestyBooking,
    clearBooking,
    GuestyBookingResult,
    isQuoteExpired,
    parseQuote,
    saveBookingResult,
} from '@/helper/guestyBooking.helper'
// sama seperti create quote: Bearer Token dinamis via /guesty-open-api (tanpa CORS)
import {
    addGuestGuestyServerV2,
    addReservationFromQuoteGuestyServerV2,
    getPaymentProviderListingGuestyServerV2,
    getQuoteGuestyServerV2,
    guestyPaymentAddToReservationsServerV2,
    guestyPaymentCreatePaymentMethodServerV2,
} from '@/service/api/guesty/server/guestyServerV2.api'
import { THANK_YOU_GUESTY } from '@/config/pagePath.config'
import useSessionStorageJson from '@/hook/useSessionStorageJson.hook'

// SDK GuestyPay wajib dimuat dari pay.guesty.com (PCI), tidak boleh di-bundle
// Docs: https://github.com/guestyorg/tokenization-js/wiki/v3-Integration
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

const loadTokenizationSdk = (): Promise<any> =>
    new Promise((resolve, reject) => {
        const w = window as any
        if (w.guestyTokenization) return resolve(w.guestyTokenization)

        const existing = document.querySelector(
            `script[src="${TOKENIZATION_SCRIPT}"]`,
        )
        const script =
            (existing as HTMLScriptElement) || document.createElement('script')

        script.addEventListener('load', () =>
            w.guestyTokenization
                ? resolve(w.guestyTokenization)
                : reject(new Error('Payment form failed to load')),
        )
        script.addEventListener('error', () =>
            reject(new Error('Payment form failed to load')),
        )

        if (!existing) {
            script.src = TOKENIZATION_SCRIPT
            script.async = true
            document.head.appendChild(script)
        }
    })

const splitName = (full: string) => {
    const parts = full.trim().split(/\s+/)
    const firstName = parts[0] || ''
    return { firstName, lastName: parts.slice(1).join(' ') || firstName }
}

const apiError = (err: any, fallback = 'Something went wrong.') =>
    err?.response?.data?.error?.message ||
    err?.response?.data?.message ||
    err?.message ||
    fallback

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Guesty menyarankan backoff antara create reservation & create payment
// (503 "Reservation is not ready for payments yet")
const addPaymentWithRetry = async (formParams: any) => {
    const delays = [1000, 2000, 4000]
    for (let i = 0; ; i++) {
        try {
            return await guestyPaymentAddToReservationsServerV2(formParams)
        } catch (err: any) {
            if (err?.response?.status === 503 && i < delays.length) {
                await sleep(delays[i])
                continue
            }
            throw err
        }
    }
}

const usePaymentBook = () => {
    const router = useRouter()
    const [formRequest, setFormRequest] = useState<any>({ ...initForm })
    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    // booking (quote) yang dipilih di halaman property, isReady = sessionStorage sudah dibaca
    const { value: booking, isReady } =
        useSessionStorageJson<GuestyBooking>(BOOKING_STORAGE_KEY)
    const [providerId, setProviderId] = useState('')
    const [isCardFormReady, setIsCardFormReady] = useState(false)
    const [isCardValid, setIsCardValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    // reservasi sudah dibuat tapi kartu gagal -> retry bayar tanpa buat reservasi baru
    const [pendingReservation, setPendingReservation] = useState({
        reservationId: '',
        confirmationCode: '',
    })
    const sdkRef = useRef<any>(null)

    const isCard = formRequest.paymentMethod === 'credit_card'
    const isExpired = isQuoteExpired(booking)

    // Payment provider listing (dibutuhkan form kartu GuestyPay)
    useEffect(() => {
        if (!booking?.listingId) return
        getPaymentProviderListingGuestyServerV2(booking.listingId)
            .then((res: any) => {
                const id = res?.data?.paymentProviderId || ''
                if (!id)
                    setError(
                        'Online card payment is not available for this property. Please choose bank transfer.',
                    )
                setProviderId(id)
            })
            .catch((err) =>
                setError(
                    apiError(err, 'Online payment is currently unavailable.'),
                ),
            )
    }, [booking?.listingId])

    // Render form kartu GuestyPay (iframe) saat metode = credit card
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
                if (!cancelled) setIsCardFormReady(true)
            })
            .catch((err) => {
                if (!cancelled)
                    setError(err?.message || 'Payment form failed to load')
            })

        return () => {
            cancelled = true
            setIsCardFormReady(false)
            setIsCardValid(false)
            try {
                sdkRef.current?.destroy?.()
            } catch {}
        }
    }, [isCard, providerId])

    const _validate = () => {
        if (isExpired)
            return 'Your price quote has expired. Please search your dates again.'
        if (!formRequest.firstName.trim()) return 'Please enter your name.'
        if (!formRequest.email.trim()) return 'Please enter your email.'
        if (!formRequest.phone) return 'Please enter your phone number.'
        if (!formRequest.isAcceptPolicy)
            return 'Please accept the Privacy Policy and Terms.'
        if (isCard && !providerId)
            return 'Online card payment is not available. Please choose bank transfer.'
        if (isCard && (!isCardFormReady || !isCardValid))
            return 'Please complete your card details.'
        return ''
    }

    const _finish = (result: {
        status: GuestyBookingResult['status']
        reservationId: string
        confirmationCode?: string
        total: number
    }) => {
        if (!booking) return
        saveBookingResult({
            status: result.status,
            reservationId: result.reservationId,
            confirmationCode: result.confirmationCode,
            propertyName: booking.propertyName,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            total: result.total,
            currency: booking.currency,
        })
        clearBooking()
        router.push(THANK_YOU_GUESTY)
    }

    // kartu gagal setelah reservasi dibuat -> tamu bisa coba kartu lain
    const _paymentFailed = (
        reservationId: string,
        confirmationCode: string,
        message?: string,
    ) => {
        setPendingReservation({ reservationId, confirmationCode })
        setError(message || 'Your payment failed. Please try another card.')
        setIsLoading(false)
    }

    const _handleSubmit = async () => {
        if (!booking || isLoading) return

        const invalid = _validate()
        if (invalid) return setError(invalid)

        setIsLoading(true)
        setError('')

        const { firstName, lastName } = splitName(formRequest.firstName)
        const guest = {
            firstName,
            lastName,
            email: formRequest.email.trim(),
            phone: formRequest.phone,
        }

        try {
            // 1. Ambil ulang quote -> pastikan masih valid & pakai harga terbaru
            const quoteRes: any = await getQuoteGuestyServerV2(booking.quoteId)
            const quote = quoteRes?.data
            if (quote?.status && quote.status !== 'valid')
                throw new Error(
                    'Your price quote has expired. Please search your dates again.',
                )
            const latest = parseQuote(quote, {
                listingId: booking.listingId,
                propertyName: booking.propertyName,
                guests: booking.guests,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
            })
            if (!latest) throw new Error('These dates are no longer available.')
            const amount = Math.round(latest.total * 100) / 100

            // 2. Tokenisasi kartu di iframe GuestyPay (data kartu tidak lewat kode kita).
            //    method default 'verify' -> verifikasi 3DS dilakukan di tahap ini.
            let cardToken = ''
            if (isCard) {
                const pm = await sdkRef.current.submit({
                    amount,
                    currency: latest.currency,
                    listingId: booking.listingId,
                    quoteId: booking.quoteId,
                    guest,
                })
                cardToken = pm?._id
                if (!cardToken) throw new Error('Card could not be verified.')
            }

            // 3. Guest (Guesty otomatis memakai guest lama jika email sama)
            const guestRes: any = await addGuestGuestyServerV2(guest)
            const guestId = guestRes?.data?._id
            if (!guestId) throw new Error('Unable to create guest.')

            // 4. Reservasi dari quote (skip jika retry pembayaran)
            let { reservationId, confirmationCode } = pendingReservation
            if (!reservationId) {
                const reservationRes: any =
                    await addReservationFromQuoteGuestyServerV2({
                        quoteId: booking.quoteId,
                        ...(latest.ratePlanId
                            ? { ratePlanId: latest.ratePlanId }
                            : {}),
                        guestId,
                        // kartu -> confirmed lalu langsung di-charge
                        // transfer bank -> ditahan (reserved) 48 jam
                        status: isCard ? 'confirmed' : 'reserved',
                        ...(isCard ? {} : { reservedUntil: 48 }),
                        ignoreCalendar: false,
                        ignoreTerms: false,
                        ignoreBlocks: false,
                    })
                reservationId =
                    reservationRes?.data?.reservationId ||
                    reservationRes?.data?._id
                confirmationCode = reservationRes?.data?.confirmationCode || ''
                if (!reservationId)
                    throw new Error('Unable to create reservation.')
            }

            if (!isCard) {
                return _finish({
                    status: 'reserved',
                    reservationId,
                    confirmationCode,
                    total: amount,
                })
            }

            // 5. Simpan kartu (token GuestyPay) sebagai payment method guest
            //    (endpoint ini wajib confirmationCode reservasi)
            if (!confirmationCode)
                return _paymentFailed(
                    reservationId,
                    confirmationCode,
                    'Reservation created, but online payment could not be started. Our team will contact you.',
                )
            let paymentMethodId = ''
            try {
                const pmRes: any =
                    await guestyPaymentCreatePaymentMethodServerV2({
                        guestId,
                        paymentProviderId: providerId,
                        confirmationCode,
                        _id: cardToken,
                        reuse: false,
                    })
                const pm = pmRes?.data
                if (pm?.status && pm.status !== 'ACTIVE')
                    throw new Error(
                        'Your card could not be verified. Please try another card.',
                    )
                paymentMethodId = pm?._id
            } catch (err) {
                return _paymentFailed(
                    reservationId,
                    confirmationCode,
                    apiError(err, 'Your card could not be saved.'),
                )
            }
            if (!paymentMethodId)
                return _paymentFailed(
                    reservationId,
                    confirmationCode,
                    'Your card could not be saved. Please try another card.',
                )

            // 6. Charge langsung (tanpa shouldBePaidAt)
            let payment: any
            try {
                const payRes: any = await addPaymentWithRetry({
                    reservationId,
                    paymentMethodId,
                    amount,
                    note: 'Website booking',
                })
                payment = payRes?.data
            } catch (err) {
                return _paymentFailed(
                    reservationId,
                    confirmationCode,
                    apiError(err, 'Payment failed. Please try another card.'),
                )
            }

            const result = { reservationId, confirmationCode, total: amount }

            switch (payment?.status) {
                case 'SUCCEEDED':
                    return _finish({ ...result, status: 'paid' })
                case 'FAILED':
                case 'ERROR':
                case 'CANCELLED':
                    return _paymentFailed(
                        reservationId,
                        confirmationCode,
                        payment?.error?.message ||
                            (typeof payment?.error === 'string'
                                ? payment.error
                                : '') ||
                            'Your card was declined. Please try another card.',
                    )
                case 'PENDING_AUTH': {
                    // bank minta autentikasi tambahan (3DS)
                    const url =
                        payment?.authenticationRequiredData?.authenticationUrl
                    if (url) window.open(url, '_blank', 'noopener')
                    return _finish({ ...result, status: 'pending_auth' })
                }
                default:
                    // PENDING / PROCESSING -> diproses Guesty, konfirmasi via email
                    return _finish({ ...result, status: 'processing' })
            }
        } catch (err: any) {
            setError(apiError(err, 'Something went wrong. Please try again.'))
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
        isExpired,
        isRetryPayment: !!pendingReservation.reservationId,
        isLoading,
        error,
    }
}

export default usePaymentBook
