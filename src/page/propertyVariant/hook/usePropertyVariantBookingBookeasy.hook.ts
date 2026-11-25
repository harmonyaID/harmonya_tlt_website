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
    pricePerNight: '',
    nights: '',
    fee: '',
    total: '',
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

    const _handleChange = (name, value) => {
        setFormRequest((prev) => ({ ...prev, [name]: value }))
    }

    const _handleSubmit = () => {
        setIsLoading(true)
        createPropertyInquiryForm(formRequest)
            .then((res) => {
                if (isSuccess(res)) {
                    setFormRequest(bookingParam)
                    router.push(THANK_YOU_BOOKEASY)
                }
            })
            .finally(() => setIsLoading(false))
    }
    console.log(propertyVariant)
    useEffect(() => {
        if (propertyVariant) {
            setFormRequest((prev) => ({
                ...prev,
                propertyId: propertyVariant?.id,
                currency: propertyVariant?.currency,
                sourceTypeId: propertyVariant?.sourceType?.id,
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
