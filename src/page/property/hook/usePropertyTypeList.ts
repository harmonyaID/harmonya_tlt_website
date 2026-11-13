'use client'
import { useEffect, useState } from 'react'
import { getPropertyType } from '@/service/api/property.api'

const usePropertyTypeList = () => {
    const [typeList, setTypeList] = useState<any>([])

    const _handleGet = () => {
        getPropertyType('tcUseGetPropertyType').then((res) => {
            if (res) {
                setTypeList(
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
        typeList,
    }
}

export default usePropertyTypeList
