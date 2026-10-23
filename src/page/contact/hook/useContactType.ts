'use client'
import { useState, useEffect } from 'react'
import { listTypeContact } from '@/service/api/contact.api'
import { isSuccess } from '@/helper/base/condition.helper'

const useContactType = () => {
    const [listType, setListType] = useState([])

    useEffect(() => {
        listTypeContact().then((resData) => {
            if (isSuccess(resData)) {
                setListType(resData.result)
            }
        })
    }, [])

    return { listType }
}

export default useContactType
