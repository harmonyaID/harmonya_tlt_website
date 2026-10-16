'use client'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook'
import { addFormContact } from '@/service/api/contact.api'
import { isSuccess } from '@/helper/base/condition.helper'

const initForm = {
    name: '',
    phone: '',
    email: '',
    formTypeId: '1',
    subject: '',
    message: '',
}

const useContactFormHook = () => {
    const [formRequest, setFormRequest] = useState<any>({ ...initForm })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleResForm = () => {
        setFormRequest({ ...initForm })
    }

    const _handleSubmit = () => {
        if (!isLoading) {
            setIsLoading(true)
            addFormContact({
                name: formRequest.name,
            })
                .then((resData) => {
                    setIsLoading(false)

                    if (isSuccess(resData)) {
                        _handleResForm()
                    }
                })
                .catch((err) => {
                    console.log('err: ', err)
                    setIsLoading(false)
                })
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

export default useContactFormHook
