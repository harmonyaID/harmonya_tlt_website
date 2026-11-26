'use client'
import { useState, useEffect } from 'react'
import { getBlogList } from '@/service/api/blog.api'

const useBlogs = ({ passLimit = 12 }: { passLimit?: number } = {}) => {
    const [list, setList] = useState([])

    const [pagination, setPagination] = useState()

    const [search, setSearch] = useState<any>({
        page: 1,
        limit: passLimit,
        categoryIds: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const _handleGet = (passSearch = {}) => {
        setIsLoading(true)
        getBlogList({
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

    const _updateSearch = (patch: Record<string, any>) => {
        const newState = { ...search, ...patch }
        setSearch(newState)
        _handleGet(newState)
    }

    const _handleChangePage = (page: number | string) => {
        _updateSearch({ page })
    }

    // Click the active category again (or pass '') to clear the filter
    const _handleChangeCategory = (categoryId: number | string = '') => {
        _updateSearch({
            page: 1,
            categoryIds: search.categoryIds === categoryId ? '' : categoryId,
        })
    }

    useEffect(() => {
        _handleChangePage(1)
    }, [])

    return {
        list,
        isLoading,
        setList,
        search,
        _handleChangePage,
        _handleChangeCategory,
        pagination: pagination,
    }
}

export default useBlogs
