'use client'
import { ChangeEvent } from 'react'
import { isFunction, isEmpty, isNull } from 'lodash'
import { eventChange } from '@/helper/base/actionEvent.helper'
import { ChangeEventCallbackInput, ContextInput } from '../type/hook.type'

const useComponentInputConfigHook = (
    ctx: ContextInput,
    onChange: ChangeEventCallbackInput | null,
    propsName: string,
    propsValue: any,
) => {
    const dataValue =
        !isEmpty(ctx.__value) && ctx.__value[propsName] && isNull(onChange)
            ? ctx.__value[propsName]
            : propsValue

    const _handleChange: any = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = eventChange(event)

        isFunction(ctx.__handleChange) &&
        !isEmpty(ctx.__value) &&
        isNull(onChange)
            ? ctx.__handleChange(name, value, event)
            : !isNull(onChange)
              ? onChange(name, value, event)
              : null
    }

    return {
        dataValue,
        handleChange: _handleChange,
    }
}

export default useComponentInputConfigHook
