'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDateOnly } from '@/helper/formatDate.helper'
import { addQuoteGuesty } from '@/service/api/guesty/guesty.api'
import {
    GuestyBooking,
    parseQuote,
    saveBooking,
} from '@/helper/guestyBooking.helper'
import { PAYMENT_PATH } from '@/config/pagePath.config'

export type BookingVariantOption = {
    guestyId: string
    nickname: string
    guests?: number | null // kapasitas maksimal tamu (dari API)
}

// - Property variant detail : listing langsung dari `propertyId` (guestyId variant)
// - Property detail         : `variants` diisi -> tamu WAJIB memilih property dulu
const usePropertyVariantBooking = (
    propertyId: string | number = '',
    propertyName: string = '',
    {
        variants,
        maxGuests,
    }: {
        variants?: BookingVariantOption[]
        maxGuests?: number | null
    } = {},
) => {
    const router = useRouter()
    const [formRequest, setFormRequest] = useState({
        variantId: '',
        fromDate: '',
        toDate: '',
        guest: '',
    })
    const [booking, setBooking] = useState<GuestyBooking | null>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isSelectVariant = Array.isArray(variants)
    // hanya 1 pilihan -> otomatis terpilih
    const variantId =
        formRequest.variantId ||
        (variants?.length === 1 ? variants[0].guestyId : '')
    const selectedVariant = isSelectVariant
        ? variants.find((v) => v.guestyId === variantId) || null
        : null

    const listingId = isSelectVariant
        ? selectedVariant?.guestyId || ''
        : String(propertyId || '')
    const listingName = isSelectVariant
        ? selectedVariant?.nickname || ''
        : propertyName
    const guestLimit = isSelectVariant
        ? selectedVariant?.guests || null
        : maxGuests || null

    const _handleChange = (name, value) => {
        setBooking(null) // input berubah -> quote lama tidak valid lagi
        setError('')
        setFormRequest((prev) => ({ ...prev, [name]: value }))
    }

    const _handleSubmit = () => {
        const checkIn = formatDateOnly(formRequest.fromDate)
        const checkOut = formatDateOnly(formRequest.toDate)
        const guests = Number(formRequest.guest) || 0

        if (isSelectVariant && !selectedVariant)
            return setError('Please select a property first.')
        if (!listingId)
            return setError('Property is not available for booking.')
        if (!checkIn || !checkOut || guests < 1)
            return setError('Please select check-in, check-out and guests.')
        if (guestLimit && guests > guestLimit)
            return setError(
                `This property accommodates up to ${guestLimit} guests.`,
            )

        setIsLoading(true)
        setError('')
        setBooking(null)

        // quote = cek ketersediaan + harga (preview)
        addQuoteGuesty({
            listingId,
            checkInDateLocalized: checkIn,
            checkOutDateLocalized: checkOut,
            guestsCount: guests,
            source: '',
            couponCode: '',
        })
            .then((res) => {
                const result = parseQuote(res?.data, {
                    listingId,
                    propertyName: listingName,
                    guests,
                    checkIn,
                    checkOut,
                })
                if (!result)
                    setError('These dates are not available for booking.')
                else setBooking(result)
            })
            .catch((err) => {
                setError(
                    err?.response?.data?.error?.message ||
                        err?.response?.data?.message ||
                        'Unable to get the price. Please try other dates.',
                )
            })
            .finally(() => setIsLoading(false))
    }

    const _handleBookNow = () => {
        if (!booking) return
        saveBooking(booking)
        router.push(PAYMENT_PATH)
    }

    return {
        formRequest,
        variantId,
        selectedVariant,
        isSelectVariant,
        listingName,
        guestLimit,
        booking,
        error,
        isLoading,
        _handleChange,
        _handleSubmit,
        _handleBookNow,
    }
}

export default usePropertyVariantBooking
