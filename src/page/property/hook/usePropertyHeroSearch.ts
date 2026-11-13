'use client'
import { useState } from 'react'

const usePropertyHeroSearch = () => {
    const [formSearch, setFormSearch] = useState({
        fromDate: '',
        toDate: '',
        guest: '',
        collection: '',
    })

    const _handleChange = (name: any, value: any) => {
        setFormSearch((prevState) => {
            const newState = { ...prevState }
            newState[name] = value
            return newState
        })
    }

    return {
        formSearch,
        setFormSearch,
        _handleChange,
    }
}

export default usePropertyHeroSearch
