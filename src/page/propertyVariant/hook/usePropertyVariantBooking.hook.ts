'use client'
import { useState } from 'react'
import {
    addQuoteGuesty,
    getCalendarListingGuesty,
    getQuoteGuesty,
} from '@/service/api/guesty/guesty.api'
import { formatDateOnly } from '@/helper/formatDate.helper'
import { addQuoteGuestyV2 } from '@/service/api/guesty/guestyv2.api'

const usePropertyVariantBooking = (propertyId: string | number = '') => {
    const [formRequest, setFormRequest] = useState({
        fromDate: '',
        toDate: '',
        guest: '',
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleChange = (name, value) => {
        setFormRequest((prev) => ({ ...prev, [name]: value }))
    }

    const _handleSubmit = () => {
        setIsLoading(true)

        const quoteForm = {
            checkInDateLocalized: formRequest?.fromDate
                ? formatDateOnly(formRequest.fromDate)
                : '',
            checkOutDateLocalized: formRequest?.toDate
                ? formatDateOnly(formRequest.toDate)
                : '',
            guestsCount: formRequest.guest || '',
            numberOfGuests: {
                numberOfAdults: formRequest.guest || 0,
            },
            listingId: propertyId || '',
            source: 'website',
        }

        // getQuoteGuesty(propertyId, )
        addQuoteGuestyV2(quoteForm)
            .then((res) => {
                setIsLoading(false)
                console.log('list CalendarListingGuesty: ', res)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    return {
        formRequest,
        setFormRequest,
        isLoading,
        _handleChange,
        _handleSubmit,
    }
}

export default usePropertyVariantBooking
