import { useId, ChangeEvent, FC } from 'react'
import _ from 'lodash'
import { FormRadioButtonProps } from './type/componentForm.type'
import { useHookContextForm } from '@/context/Form.Context'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import { eventChange } from '@/helper/base/actionEvent.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'

const FormRadioButton: FC<FormRadioButtonProps> = (props) => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const {
        id = '',
        className = '',
        classNameRadio = '',
        label = '',
        required = false,
        disabled = false,
        readOnly = false,
        actions = {
            onChange: () => {},
        },
        nameOfChange = '',
        isUseHook = true,
    } = props

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const dataId = id || 'form-radio-btn-' + props.name + uniqueId

    const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!_.isEmpty(ctx.__value) && isUseHook) {
            const { name, value, isChecked } = eventChange(e)
            if (nameOfChange && _.isFunction(ctx.__actions[nameOfChange])) {
                ctx.__actions[nameOfChange](name, value, isChecked)
            } else {
                ctx.__handleChange(name, value, isChecked)
            }
        } else {
            actions?.onChange?.(props.name, props.value, e)
        }
    }

    const isChecked = props.defaultValue == dataValue

    return (
        <div className={className}>
            <input
                className={joinClassNameHelper(
                    'form-check-input  custom-radio',
                    classNameRadio,
                )}
                type="radio"
                name={props.aliasName || props.name}
                value={props.defaultValue}
                checked={isChecked}
                onChange={(e) => _handleChange(e)}
                id={dataId}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
            />
            <label className="fs-16 text-capitalize" htmlFor={dataId}>
                {label}
            </label>
        </div>
    )
}

export default FormRadioButton
