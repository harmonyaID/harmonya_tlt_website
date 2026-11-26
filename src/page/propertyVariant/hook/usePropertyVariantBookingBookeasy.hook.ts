'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDateOnly } from '@/helper/formatDate.helper'
import { addQuoteGuestyV2 } from '@/service/api/guesty/guestyv2.api'
import {
    GuestyBooking,
    parseQuote,
    saveBooking,
} from '@/helper/guestyBooking.helper'
import { PAYMENT_PATH, THANK_YOU_BOOKEASY } from '@/config/pagePath.config'
import { createPropertyInquiryForm } from '@/service/api/property.api'
import { isSuccess } from '@/helper/base/condition.helper'
import moment from 'moment'
import { parsePhoneNumber } from 'react-phone-number-input'

const bookingParam = {
    propertyId: '',
    propertyVariantId: '',
    sourceTypeId: '',
    name: '',
    email: '',
    countryCode: '',
    mobileNumber: '',
    isDatesFlexible: false,
    checkInDate: '',
    checkOutDate: '',
    flexibleMonth: '',
    flexibleYear: '',
    adultCount: 1,
    childrenAges: [1],
    comments: '',
    currency: '',
    pricePerNight: 0,
    nights: 0,
    fee: '',
    total: 0,
    payableAmount: '',
    payableCurrency: '',
    rateOptions: [],
    isUseCoupon: 0,
    couponCode: '',
}

const usePropertyVariantBookingBookeasy = (propertyVariant: any) => {
    const router = useRouter()
    const [formRequest, setFormRequest] = useState(bookingParam)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getTotalNights = (checkInDate: string, checkOutDate: string) => {
        const checkIn = moment(checkInDate, 'DD MMM YYYY', true)
        const checkOut = moment(checkOutDate, 'DD MMM YYYY', true)

        if (
            !checkIn.isValid() ||
            !checkOut.isValid() ||
            !checkOut.isAfter(checkIn, 'day')
        ) {
            return 0
        }

        return checkOut.diff(checkIn, 'days')
    }

    const _handleChange = (name, value) => {
        setFormRequest((prev) => {
            const checkInDate =
                name === 'checkInDate' ? value : prev.checkInDate

            const checkOutDate =
                name === 'checkOutDate' ? value : prev.checkOutDate

            const totalNights =
                checkInDate && checkOutDate
                    ? getTotalNights(checkInDate, checkOutDate)
                    : 0

            return {
                ...prev,
                [name]: value,
                nights: totalNights,
                total: prev.pricePerNight * totalNights,
            }
        })
    }

    const _handleSubmit = () => {
        setIsLoading(true)

        const countryCode = parsePhoneNumber(formRequest.mobileNumber)?.countryCallingCode || ''

        createPropertyInquiryForm({
            ...formRequest,
            checkInDate: formatDateOnly(formRequest.checkInDate, 'DD MMM YYYY'),
            checkOutDate: formatDateOnly(
                formRequest.checkOutDate,
                'DD MMM YYYY',
            ),
            countryCode: countryCode,
        })
            .then((res) => {
                if (isSuccess(res)) {
                    setFormRequest(bookingParam)
                    router.push(THANK_YOU_BOOKEASY)
                }
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (propertyVariant) {
            setFormRequest((prev) => ({
                ...prev,
                propertyId: propertyVariant?.id,
                currency: propertyVariant?.currency,
                sourceTypeId: propertyVariant?.sourceType?.id,
                pricePerNight: Number(
                    propertyVariant?.pricing?.weekdayBasePrice,
                ),
            }))
        }
    }, [propertyVariant])

    return {
        formRequest,
        isLoading,
        _handleChange,
        _handleSubmit,
    }
}

export default usePropertyVariantBookingBookeasy
