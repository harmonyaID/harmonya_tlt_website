'use client'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'

const initForm = {
    firstName: '',
    email: '',
    phone: '',
    specialRequest: '',
    paymentMethod: 'bank_transfer', // 'credit_card' | 'bank_transfer'
    isAcceptPolicy: false,
    isAcceptPromo: false,
}

const usePaymentBook = () => {
    const [formRequest, setFormRequest] = useState<any>({ ...initForm })
    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    return {
        formRequest,
        setFormRequest,
        _handleChange: nestedForm.__handleChange,
    }
}

export default usePaymentBook
