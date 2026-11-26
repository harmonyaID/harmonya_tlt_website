'use client'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'
import { createPropertyContactForm } from '@/service/api/property.api'
import { isSuccess } from '@/helper/base/condition.helper'

const DEFAULT_SOURCE_TYPE_ID = 1

const initForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
}

const usePropertyFormInquiryHook = (propertyId?: string | number | null) => {
    const [formRequest, setFormRequest] = useState<any>({ ...initForm })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleResForm = () => {
        setFormRequest({ ...initForm })
    }

    const _handleSubmit = () => {
        if (isLoading) return

        setIsLoading(true)

        createPropertyContactForm({
            propertyId: Number(propertyId) || null, // nullable|integer
            sourceTypeId: DEFAULT_SOURCE_TYPE_ID, // nullable|integer
            name: formRequest.name, // required|string
            email: formRequest.email, // required|email
            subject: formRequest.subject, // required|string
            message: formRequest.message, // required|string
            phone: formRequest.phone || null, // nullable|string
        })
            .then((result) => {
                if (isSuccess(result)) {
                    _handleResForm()
                }
            })
            .catch(() => {})
            .finally(() => setIsLoading(false))
    }

    return {
        formRequest,
        isLoading,
        setFormRequest,

        _handleChange: nestedForm.__handleChange,

        _handleSubmit,
    }
}

export default usePropertyFormInquiryHook
