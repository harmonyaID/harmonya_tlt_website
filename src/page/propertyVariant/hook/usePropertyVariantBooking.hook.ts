'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDateOnly } from '@/helper/formatDate.helper'
import { addQuoteGuestyV2 } from '@/service/api/guesty/guestyv2.api'
import {
    GuestyBooking,
    parseQuote,
    saveBooking,
} from '@/helper/guestyBooking.helper'
import { PAYMENT_PATH } from '@/config/pagePath.config'

const usePropertyVariantBooking = (
    propertyId: string | number = '',
    propertyName: string = '',
) => {
    const router = useRouter()
    const [formRequest, setFormRequest] = useState({
        fromDate: '',
        toDate: '',
        guest: '',
    })
    const [booking, setBooking] = useState<GuestyBooking | null>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleChange = (name, value) => {
        setBooking(null) // input berubah -> quote lama tidak valid lagi
        setError('')
        setFormRequest((prev) => ({ ...prev, [name]: value }))
    }

    const _handleSubmit = () => {
        const checkIn = formatDateOnly(formRequest.fromDate)
        const checkOut = formatDateOnly(formRequest.toDate)
        const guests = Number(formRequest.guest) || 0

        if (!propertyId)
            return setError('Property is not available for booking.')
        if (!checkIn || !checkOut || guests < 1)
            return setError('Please select check-in, check-out and guests.')

        setIsLoading(true)
        setError('')
        setBooking(null)

        addQuoteGuestyV2({
            listingId: propertyId,
            checkInDateLocalized: checkIn,
            checkOutDateLocalized: checkOut,
            guestsCount: guests,
            numberOfGuests: { numberOfAdults: guests },
            source: 'website',
            ignoreTerms: false,
            ignoreCalendar: false,
            ignoreBlocks: false,
        })
            .then((res) => {
                const parsed = parseQuote(res.data, {
                    listingId: String(propertyId),
                    propertyName,
                    guests,
                })
                if (!parsed)
                    setError('These dates are not available for booking.')
                else setBooking(parsed)
            })
            .catch((err) => {
                setError(
                    err?.response?.data?.error?.message ||
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
        booking,
        error,
        isLoading,
        _handleChange,
        _handleSubmit,
        _handleBookNow,
    }
}

export default usePropertyVariantBooking
