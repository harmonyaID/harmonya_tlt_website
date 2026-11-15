'use client'
import SelectTreeOption from '@/component/form/SelectTreeOption'
import { useId, useState, useEffect, useLayoutEffect } from 'react'
import { useHookContextForm } from '@/context/Form.Context'
import { getPropertyType } from '@/service/api/property.api'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import FormSelectOption from '@/component/form/FormSelectOption'

const PropertyFormSelectTreeType = (props: any) => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const { dataValue, handleChange } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props?.name,
        props?.value,
    )

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
                setList(
                    res?.result?.map((vm) => ({
                        value: vm.id,
                        label: vm.name,
                    })) || [],
                )
            }
        })
    }

    useLayoutEffect(() => {
        _handleGet()
    }, [])

    return (
        <>
            {/*<SelectTreeOption*/}
            {/*    options={list}*/}
            {/*    className="rounded-pill"*/}
            {/*    dataValue={dataValue}*/}
            {/*    handleChoose={handleChange}*/}
            {/*/>*/}

            <FormSelectOption name="typeId" classNameSelect="rounded-pill">
                <option value="">Type All</option>
                {list.map((vm, index) => (
                    <option value={vm.value} key={index}>
                        {/*{value === vm.toString() ? 'Bedroom: ' : ''}*/}
                        {vm.label}
                    </option>
                ))}
            </FormSelectOption>
        </>
    )
}

export default PropertyFormSelectTreeType
