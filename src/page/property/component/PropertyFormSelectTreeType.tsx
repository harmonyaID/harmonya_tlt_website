'use client'
import SelectTreeOption from '@/component/form/SelectTreeOption'
import { useId, useState, useEffect, useLayoutEffect } from 'react'
import { useHookContextForm } from '@/context/Form.Context'
import { getPropertyType } from '@/service/api/property.api'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import SelectOptionGeneral from '@/common/dataForm/SelectOptionGeneral'
import joinClassNameHelper from '@/helper/joinClassName.helper'

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

            <SelectOptionGeneral
                name={props.name || 'typeId'}
                className={joinClassNameHelper(
                    'rounded-pill',
                    props?.classNameSelect,
                    props?.className,
                )}
                placeholder="Type"
                options={[{ value: '', label: 'Type All' }, ...list]}
            />
        </>
    )
}

export default PropertyFormSelectTreeType
