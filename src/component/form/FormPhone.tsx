import { ChangeEvent, useState } from 'react'
import PhoneInput, {
    Country,
    getCountries,
    getCountryCallingCode,
} from 'react-phone-number-input'
import PhoneNumberInput from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import 'react-phone-number-input/style.css'
import { FormInputProps } from '@/component/form/type/componentForm.type'
import { useHookContextForm } from '@/context/Form.Context'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import _ from 'lodash'
import { eventChange } from '@/helper/base/actionEvent.helper'

const FormPhone = (props: FormInputProps & {
        isUseHook?: boolean
        variant?: 'default' | 'underline'
        defaultCountry?: Country
    }) => {
    const ctx = useHookContextForm()

    const { dataValue, handleChange } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const {
        id = '',
        className = '',
        name = '',
        classNameInput = '',
        type = 'text',
        autoComplete = 'off',
        placeholder = '',
        icon = '',
        classNameIcon = '',

        required = false,
        disabled = false,
        readOnly = false,

        isNumberOnly = false,
        isCheckMinInput = false,
        isCheckMaxInput = false,
        isUseHook = true,
        variant = 'default',
        defaultCountry = 'AU',

        handleIcon = () => {},

        actions,

        min = '',
        max = '',
        other,
    } = props

    const [country, setCountry] = useState<Country>(defaultCountry)
    const [open, setOpen] = useState(false)

    const countries = getCountries()

    const _handleChange = (value) => {
        if (!_.isEmpty(ctx.__value) && isUseHook) {
            ctx.__handleChange(name, value)
        } else {
            actions?.onChange?.(props.name, props.value)
        }
    }

    const isUnderline = variant === 'underline'

    const underlineReset = {
        border: 'none',
        borderBottom: '1px solid var(--bs-border-color, #dee2e6)',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
    }

    return (
        <div className={className}>
            <div className="input-group flex-nowrap">
                <div className="dropdown">
                    <button
                        type="button"
                        className={`btn dropdown-toggle ${isUnderline ? '' : 'border'}`}
                        style={
                            isUnderline
                                ? underlineReset
                                : { borderRadius: '7px 0 0 7px' }
                        }
                        onClick={() => setOpen(!open)}>
                        +{getCountryCallingCode(country)}
                    </button>

                    {open && (
                        <div
                            className="dropdown-menu show"
                            style={{
                                maxHeight: 250,
                                overflowY: 'auto',
                            }}>
                            {countries.map((code) => (
                                <button
                                    type="button"
                                    key={code}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setCountry(code)
                                        setOpen(false)
                                    }}>
                                    {en[code]} (+{getCountryCallingCode(code)})
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <PhoneNumberInput
                    country={country}
                    international
                    value={dataValue}
                    onChange={(value) => _handleChange(value as Country)}
                    className="form-control"
                    style={isUnderline ? underlineReset : undefined}
                    placeholder={placeholder || 'Phone number'}
                />
            </div>
        </div>
    )
}

export default FormPhone
