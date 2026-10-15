'use client'
import SelectTreeOption from '@/component/form/SelectTreeOption'
import { useId, useState } from 'react'
import { useHookContextForm } from '@/context/Form.Context'

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

    const _handleGet = () => {}

    return (
        <>
            <SelectTreeOption />
        </>
    )
}

export default PropertyFormSelectTreeType
