'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDateOnly } from '@/helper/formatDate.helper'
import { PROPERTY_RESULT_PATH } from '@/config/pagePath.config'

const usePropertyHeroSearch = () => {
    const router = useRouter()
    const [formSearch, setFormSearch] = useState({
        fromDate: '',
        toDate: '',
        guest: '',
        typeId: '',
    })

    const _handleChange = (name: any, value: any) => {
        setFormSearch((prevState) => {
            const newState = { ...prevState }
            newState[name] = value
            return newState
        })
    }

    // klik SEARCH -> /property-result?checkIn=..&checkOut=..&guests=..&typeId=..
    const _handleSearch = () => {
        const query = new URLSearchParams()
        const checkIn = formatDateOnly(formSearch.fromDate)
        const checkOut = formatDateOnly(formSearch.toDate)
        const guests = parseInt(String(formSearch.guest), 10)

        if (checkIn) query.set('checkIn', checkIn)
        if (checkOut) query.set('checkOut', checkOut)
        if (guests > 0) query.set('guests', String(guests))
        if (formSearch.typeId) query.set('typeId', String(formSearch.typeId))

        const qs = query.toString()
        router.push(PROPERTY_RESULT_PATH + (qs ? `?${qs}` : ''))
    }

    return {
        formSearch,
        setFormSearch,
        _handleChange,
        _handleSearch,
    }
}

export default usePropertyHeroSearch
