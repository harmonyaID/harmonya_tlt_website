'use client'

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { StylesConfig } from 'react-select'
import { SelectOptionProps } from '@/type/form.type'

const SelectOption = (props: SelectOptionProps) => {
    const {
        id = '',
        name = '',
        className: rawClassName = '',
        label = '',
        required = false,
        value = '',
        disabled = false,
        onChange = () => {},
        placeholder = '',
        options = [],
        isClearable = false,
        isMulti = false,
        otherConfigStyles = {},
        others,
        isCreatable = false,
    } = props

    // underline variant (hero search): no box border, only a bottom line.
    // The classes are consumed here so they don't style the wrapper elements.
    const isUnderlineBlack = rawClassName.includes(
        'form-transparent-underline-black',
    )
    const isUnderline =
        isUnderlineBlack || rawClassName.includes('form-transparent-underline')
    const className = isUnderline
        ? rawClassName
              .split(/\s+/)
              .filter(
                  (c) =>
                      c &&
                      c !== 'form-control' &&
                      !c.startsWith('form-transparent-underline'),
              )
              .join(' ')
        : rawClassName
    const underlineColor = isUnderlineBlack ? '#000' : '#fff'
    const underlineLine = isUnderlineBlack ? '#BABABA' : '#fff'

    const myId = id || 'select-option-search-' + name

    const colourStyles: StylesConfig<any, boolean> = {
        control: (styles, { isFocused }) => ({
            ...styles,
            overflow: 'hidden',
            minHeight: 42,
            borderColor: isFocused
                ? 'var(--bs-neutral-200)'
                : 'var(--bs-neutral-200)',
            borderWidth: '1px',
            borderRadius: className.includes('rounded-pill') ? '50rem' : '8px',
            backgroundColor: '#ffffff',
            boxShadow: isFocused ? '0 0 0 1px var(--bs-neutral-200)' : 'none',
            '&:hover': {
                borderColor: 'var(--bs-tint-300)',
            },
            ...(isUnderline && {
                borderWidth: 0,
                borderBottom: `.5px solid ${underlineLine}`,
                borderRadius: 0,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                '&:hover': { borderBottomColor: '#ccc' },
            }),
        }),

        valueContainer: (styles) => ({
            ...styles,
            padding: '2px 12px',
        }),

        placeholder: (styles) => ({
            ...styles,
            color: isUnderline ? underlineColor : '#212529',
            fontSize: '16px',
        }),

        singleValue: (styles) => ({
            ...styles,
            color: isUnderline ? underlineColor : '#212529',
        }),

        input: (styles) => ({
            ...styles,
            color: isUnderline ? underlineColor : '#212529',
        }),

        multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#e9f2ff',
            borderRadius: '5px',
        }),

        multiValueLabel: (styles) => ({
            ...styles,
            color: '#212529',
            fontSize: '13px',
        }),

        multiValueRemove: (styles) => ({
            ...styles,
            color: '#6c757d',
            '&:hover': {
                backgroundColor: '#dc3545',
                color: '#ffffff',
            },
        }),

        indicatorsContainer: (styles) => ({
            ...styles,
            backgroundColor: isUnderline ? 'transparent' : '#ffffff',
        }),

        indicatorSeparator: () => ({
            display: 'none',
        }),

        dropdownIndicator: (styles) => ({
            ...styles,
            color: isUnderline ? underlineColor : '#6c757d',
            '&:hover': {
                color: isUnderline ? underlineColor : '#212529',
            },
        }),

        clearIndicator: (styles) => ({
            ...styles,
            color: '#6c757d',
            padding: '8px 4px',
            marginRight: '-8px',
            '&:hover': {
                color: '#dc3545',
            },
        }),

        menu: (styles) => ({
            ...styles,
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            marginTop: '5px',
            zIndex: 2000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            opacity: 1,
        }),

        menuList: (styles) => ({
            ...styles,
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '5px',
        }),

        option: (styles, { isFocused, isSelected, isDisabled }) => ({
            ...styles,

            backgroundColor: isSelected
                ? '#138f8f'
                : isFocused
                  ? '#e8f5f5'
                  : '#ffffff',

            color: isSelected ? '#ffffff' : isDisabled ? '#adb5bd' : '#212529',

            cursor: isDisabled ? 'not-allowed' : 'pointer',

            ':active': {
                backgroundColor: '#138f8f',
                color: '#ffffff',
            },
        }),

        noOptionsMessage: (styles) => ({
            ...styles,
            color: '#6c757d',
            fontSize: '13px',
        }),

        loadingMessage: (styles) => ({
            ...styles,
            color: '#6c757d',
            fontSize: '13px',
        }),

        menuPortal: (styles) => ({
            ...styles,
            zIndex: 2000,
        }),

        ...otherConfigStyles,
    }

    const selectConfig = {
        id: myId,
        name: name || 'react-select',
        placeholder: placeholder || 'Select an option',
        value,
        onChange,
        required,
        isDisabled: disabled,
        options,
        isMulti,
        isClearable,
        className: className || '',
        classNamePrefix: 'slc-gx',
        styles: colourStyles,
        menuPortalTarget:
            typeof document !== 'undefined' ? document.body : undefined,
        menuPosition: 'fixed' as const,
        ...others,
    }

    return (
        <div className={'form-group ' + className}>
            {label && (
                <label htmlFor={myId} className="form-label">
                    {label}
                    <span className="text-danger-200 fs-16">
                        {required ? '*' : ''}
                    </span>
                </label>
            )}

            {isCreatable ? (
                <CreatableSelect {...selectConfig} />
            ) : (
                <Select {...selectConfig} />
            )}
        </div>
    )
}

export default SelectOption
