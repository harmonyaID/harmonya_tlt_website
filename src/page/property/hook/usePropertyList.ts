'use client'

import { useEffect, useState } from 'react'
import { getPropertyList } from '@/service/api/property.api'

const usePropertyList = () => {
    const [list, setList] = useState([])

    const [pagination, setPagination] = useState({})

    const [search, setSearch] = useState<any>({
        page: 1,
        limit: 30,
        bathroom: '',
        bedroom: '',
        typeId: '',
        amenitiesId: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const _handleParamSearch = (passData: any) => {
        return passData ? [passData] : []
    }

    const _handleGet = (passSearch: any = {}) => {
        setIsLoading(true)
        getPropertyList({
            ...passSearch,
            propertyTypeIds: _handleParamSearch(passSearch?.typeId),
            amenitiesCategoryIds: _handleParamSearch(passSearch?.amenitiesId),
        })
            .then((res) => {
                setList(res?.result || [])
                setPagination(res?.pagination || {})
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log('err: ', err)
            })
    }

    const _handleChangePage = (page: number | string) => {
        setSearch((prev: any) => {
            const newState = { ...prev }

            newState.page = page

            _handleGet(newState)

            return newState
        })
    }

    const _handleChange = (name: string = '', value: any) => {
        setSearch((prevState) => {
            const newState = { ...prevState }
            newState[name] = value
            newState.page = 1

            _handleGet(newState)

            return { ...newState }
        })
    }

    useEffect(() => {
        _handleGet(search)
    }, [])

    return {
        list,
        isLoading,
        pagination,
        _handleChangePage,
        search,
        setSearch,
        _handleChange,
    }
}

export default usePropertyList
