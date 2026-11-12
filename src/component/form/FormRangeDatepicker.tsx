import { useEffect, useId, FC } from 'react'
import { X } from 'react-feather'
import { useHookContextForm } from '@/context/Form.Context'
import { eventChange } from '@/helper/base/actionEvent.helper'
import { FormInputDateRangePickerProps } from '@/component/form/type/componentForm.type'
import { isEmpty, isFunction } from 'lodash'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const FormInputDateRangePicker: FC<FormInputDateRangePickerProps> = (props) => {
    const ctx = useHookContextForm()
    const defaultId = useId()

    const {
        id = '',
        idStartDate = '',
        idEndDate = '',

        name = '',
        startName = 'fromDate',
        endName = 'toDate',

        value = '',

        className = '',
        classInput = '',
        label = '',
        extraLabel = '',

        required = false,
        disabled = false,
        disabledStartDate = false,
        disabledEndDate = false,
        clearButton = false,

        autoComplete = 'off',
        placeholder = '20/05/2023',
        format = 'dd/mm/yyyy',
        readOnly = true,
        actions = {
            onChange: () => {},
        },
        config = {},

        other,
    } = props

    const idInput = id || 'text-daterangepicker-' + (name || '') + defaultId
    const idClearFromDate =
        idStartDate + 'clear-btn' || 'custom-clear-btn-fromDate'
    const idClearToDate = idEndDate + 'clear-btn' || 'custom-clear-btn-toDate'

    const dataValue = (!isEmpty(ctx.__value) && ctx.__value[name]) || value

    const _handleChange = (event) => {
        const { name, value } = eventChange(event)

        isFunction(ctx.__handleChange) && !isEmpty(ctx.__value)
            ? ctx.__handleChange(name, value)
            : actions.onChange(name, value, event)
    }

    const _configDateRangePicker = (
        element: null | any = null,
        DateRangePicker: object | any = {},
        passConfig: object | any = {},
    ) => {
        const baseConfigDatePicker = new DateRangePicker(element, {
            clearButton: config.clearButton || false,
            buttonClass: config.buttonClass || 'btn',
            format: config.format || 'dd/mm/yyyy',
            autohide: config.autohide || true,
            prevArrow: config.prevArrow || '‹',
            nextArrow: config.nextArrow || '›',
            ...passConfig,
        })

        return baseConfigDatePicker
    }

    useEffect(() => {
        let dateRangePicker = null
        const elem = document.getElementById(idInput)

        import('vanillajs-datepicker').then((module) => {
            const { DateRangePicker } = module.default || module

            // clear button
            const customClearBtnFromDate =
                document.getElementById(idClearFromDate)
            const customClearBtnToDate = document.getElementById(idClearToDate)

            dateRangePicker = _configDateRangePicker(
                elem,
                DateRangePicker,
                config,
            )

            elem.addEventListener('changeDate', (e) => {
                _handleChange(e || '')
            })

            // clear button
            customClearBtnFromDate?.addEventListener('click', (e) => {
                dateRangePicker.setDates({ clear: true })
            })

            customClearBtnToDate?.addEventListener('click', (e) => {
                dateRangePicker.setDates({ clear: false }, { clear: true })
            })
        })

        return () => {
            dateRangePicker?.destroy()
        }
    }, [config])

    return (
        <div className="wp-custom-datepicker">
            {label ? (
                <label className="form-label">
                    {label}
                    <span className="text-danger-200 fs-16">
                        {required ? '*' : ''}
                    </span>

                    {extraLabel ? (
                        <span className="fs-12 fw-400 text-danger-200">
                            {extraLabel}
                        </span>
                    ) : null}
                </label>
            ) : null}
            <div
                id={idInput}
                className={joinClassNameHelper(
                    'input-daterange row align-items-center',
                    className,
                )}>
                <div className="col pe-0">
                    <div className="wp-input-group-append">
                        <input
                            id={idStartDate || startName}
                            type="text"
                            value={dataValue.fromDate}
                            name={startName}
                            onChange={(e) => _handleChange(e)}
                            className={joinClassNameHelper(
                                'startDate form-control',
                                classInput,
                            )}
                            disabled={disabled || disabledStartDate}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            required={required}
                            {...other}
                        />

                        <button
                            id={idClearFromDate}
                            className={joinClassNameHelper(
                                'custom-clear-btn bg-transparent border-0 text-danger-200 my-0 me-2',
                                clearButton && dataValue ? 'd-block' : 'd-none',
                            )}
                            type="button">
                            <X size={14} strokeWidth={5} />
                        </button>
                    </div>
                </div>

                <div className="col-auto px-0">
                    <div className="input-group-addon">to</div>
                </div>

                <div className="col ps-0">
                    <div className="wp-input-group-append">
                        <input
                            id={idEndDate || endName}
                            type="text"
                            value={dataValue.toDate}
                            name={endName}
                            onChange={(e) => _handleChange(e)}
                            className={
                                'endDate form-control' +
                                (classInput ? ` ${classInput}` : '')
                            }
                            disabled={disabled || disabledEndDate}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            required={required}
                            {...other}
                        />

                        <button
                            id={idClearToDate}
                            className={joinClassNameHelper(
                                'custom-clear-btn bg-transparent border-0 text-danger-200 my-0 me-2',
                                clearButton && dataValue ? 'd-block' : 'd-none',
                            )}
                            type="button">
                            <X size={14} strokeWidth={5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormInputDateRangePicker
