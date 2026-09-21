'use client'
import { useEffect, useState } from 'react'

const useGeneralDataList = ({
    configSearch = {},
    urlAPI = () => {},
}: {
    configSearch?: any
    urlAPI?: (pass: any) => any
}) => {
    const [list, setList] = useState([])

    const [pagination, setPagination] = useState({})

    const [search, setSearch] = useState<any>({
        page: 1,
        limit: 12,
        ...configSearch,
    })

    const [isLoading, setIsLoading] = useState(false)

    const _handleGet = (passSearch = {}) => {
        setIsLoading(true)
        urlAPI({
            ...search,
            ...passSearch,
        })
            .then((res) => {
                setIsLoading(false)

                setList(res?.result || [])
                setPagination(res?.pagination || {})
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

    useEffect(() => {
        _handleGet(search)
    }, [])

    return {
        list,
        setList,
        isLoading,
        pagination,
        _handleChangePage,
    }
}

export default useGeneralDataList
