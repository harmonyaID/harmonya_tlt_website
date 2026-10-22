'use client'
import SelectTreeOption from '@/component/form/SelectTreeOption'
import { useId, useState, useEffect, useLayoutEffect } from 'react'
import { useHookContextForm } from '@/context/Form.Context'
import { getPropertyType } from '@/service/api/property.api'

const PropertyFormSelectTreeType = () => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const [list, setList] = useState<any>([])

    const _configList = () => {
        return list.map((vm) => ({
            value: vm.id,
            label: vm.name,
        }))
    }

    const _handleGet = () => {
        getPropertyType().then((res) => {
            console.log('res: ', res)
            if (res) {
            }
        })
    }

    useLayoutEffect(() => {
        _handleGet()
    }, [])

    return (
        <>
            <SelectTreeOption className="rounded-pill" />
        </>
    )
}

export default PropertyFormSelectTreeType
