'use client'

import { useState, useEffect } from 'react'
import { getDetailListingGuesty } from '@/service/api/guesty/guesty.api'

const usePropertyVariantGuesty = (guestyId: string) => {
    const [list, setList] = useState([])
    const [search, setSearch] = useState<any>({
        search: '',
    })
    const [pagination, setPagination] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const _handleGet = () => {
        getDetailListingGuesty(guestyId).then((res) => {
            console.log('res: ', res)
        })
    }

    useEffect(() => {
        _handleGet()
    }, [])

    return {
        propertyList: list,
    }
}

export default usePropertyVariantGuesty
