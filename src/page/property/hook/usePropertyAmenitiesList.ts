'use client'

import { useEffect, useState } from 'react'
import { getPropertyAmenities } from '@/service/api/property.api'

const usePropertyAmenities = () => {
    const [amenitiesList, setAmenitiesList] = useState<any>([])

    const _handleGet = () => {
        getPropertyAmenities('tcUseGetPropertyType').then((res) => {
            if (res) {
                setAmenitiesList(
                    res?.result?.map((vm) => ({
                        value: vm.id,
                        label: vm.name,
                    })) || [],
                )
            }
        })
    }

    useEffect(() => {
        _handleGet()
    }, [])

    return {
        amenitiesList,
    }
}

export default usePropertyAmenities
