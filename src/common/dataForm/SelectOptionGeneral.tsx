import { useEffect, useId, useState } from 'react'
import { isArray, isEmpty } from 'lodash'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import { useHookContextForm } from '@/context/Form.Context'
import SelectOption from '@/component/form/SelectOption'
import { SelectOptionProps } from '@/type/form.type'

export interface SelectOptionGeneralProps extends SelectOptionProps {
    nameOfChange?: string
    isUseHook?: boolean
    actions?: {
        onChange?: (name: string, value: any, data?: any) => void
        [key: string]: any
    }
    valueKey?: string
    isOnlyChoose?: boolean
    isCreatable?: boolean
    options: { value: any; label: string }[]
    ids?: any[]
}

const SelectOptionGeneral = (props: SelectOptionGeneralProps) => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const {
        id = 'select-rows',
        name = '',
        className = '',
        label = '',
        placeholder = 'Select Rows',

        nameOfChange = '',
        valueKey = 'value',

        isUseHook = true,

        required = false,
        disabled = false,
        isMulti = false,

        isOnlyChoose = false,
        isCreatable = false,
        ids = [],

        actions = {
            onChange: () => {},
        },

        others = {},
        otherConfigStyles = {},
    } = props

    const myId = id || 'select-rows' + name + uniqueId

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const [selectedData, setSelectedData] = useState([])

    const [options, setOptions] = useState([])

    const _handleSelectData = (data: any = {}) => {
        if (isOnlyChoose && nameOfChange) {
            _handleOnlyChose(data)
        } else {
            if (!isEmpty(ctx.__value) && isUseHook) {
                if (nameOfChange) {
                    ctx.__actions[nameOfChange](
                        props.name,
                        !isEmpty(data) ? data[valueKey] : '',
                        data,
                    )
                } else {
                    ctx.__handleChange(
                        props.name,
                        !isEmpty(data) ? data[valueKey] : '',
                    )
                }
            } else {
                if (isMulti) {
                    actions.onChange(props.name, data[valueKey], data)
                } else {
                    actions.onChange(props.name, data[valueKey] || '')
                }
            }
        }
    }

    const _handleOnlyChose = (dataDetail: object | any = {}) => {
        const isCheckValue = !isEmpty(ctx.__value)

        if (isCheckValue && isUseHook) {
            ctx.__actions[nameOfChange](dataDetail)
        } else {
            props.actions[nameOfChange](dataDetail)
        }
    }

    useEffect(() => {
        if (!isOnlyChoose) {
            const findData = props.options.filter((vm) => {
                if (!isMulti && !isArray(dataValue)) {
                    return vm[valueKey] === dataValue
                } else {
                    return dataValue.includes(vm[valueKey])
                }
            })
            setSelectedData(!isEmpty(findData) ? findData : [])
        }
    }, [isOnlyChoose, dataValue])

    // handle only choose
    useEffect(() => {
        if (isOnlyChoose) {
            const filterOptions = props.options.filter(
                (vm) => !ids.includes(vm[valueKey]),
            )

            setOptions(filterOptions)
        }
    }, [isOnlyChoose, ...ids])

    useEffect(() => {
        const findData = props.options.filter((vm) => {
            if (!isMulti && !isArray(dataValue)) {
                return vm.value === dataValue
            } else {
                return isCreatable
                    ? dataValue.some((item) => item.value === vm.value)
                    : dataValue.includes(vm.value)
            }
        })

        setSelectedData(
            isCreatable && isArray(dataValue) ? dataValue : findData || [],
        )
    }, [dataValue])

    return (
        <SelectOption
            className={className}
            label={label}
            id={myId}
            {...(!isOnlyChoose ? { value: selectedData } : {})}
            onChange={(data) => _handleSelectData(data)}
            options={isOnlyChoose ? options : props.options}
            placeholder={placeholder}
            isClearable
            isMulti={isMulti}
            required={required}
            disabled={disabled}
            others={others}
            otherConfigStyles={otherConfigStyles}
        />
    )
}

export default SelectOptionGeneral
