'use client'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'

const initForm = {
    name: '',
    // phone: '',
    email: '',
    subject: '',
    // message: '',

    propertyId: '',
    sourceTypeId: '',
    countryCode: '',
    mobileNumber: '',

    isDatesFlexible: false,
    checkInDate: '', // only send
    checkOutDate: '', // only send
    flexibleMonth: '', // only send
    flexibleYear: '', // only send

    adultCount: '', // only send
    childrenAges: [], // only send

    comments: '',
}

const usePropertyManagementFormHook = () => {
    const [formRequest, setFormRequest] = useState<any>({ ...initForm })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleResForm = () => {
        setFormRequest({ ...initForm })
    }

    const _handleSubmit = () => {
        if (!isLoading) {
            setIsLoading(true)
        }
    }

    return {
        formRequest,
        isLoading,
        setFormRequest,
        _handleChange: nestedForm.__handleChange,

        _handleSubmit,
    }
}

export default usePropertyManagementFormHook
