'use client'
import { useState, useEffect } from 'react'
import { getDetailListingGuesty } from '@/service/api/guesty/guesty.api'

const usePropertyVariantDetail = ({ propertyId }: any) => {
    const [list, set] = useState([])

    const _getProperty = () => {
        getDetailListingGuesty(propertyId)
    }

    useEffect(() => {})

    return {}
}

export default usePropertyVariantDetail
