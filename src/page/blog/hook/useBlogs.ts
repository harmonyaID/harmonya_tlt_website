'use client'
import { useState, useEffect } from 'react'
import { getBlogList } from '@/service/api/blog.api'

const useBlogs = ({
    passBlogs = [],
    passPagination = {},
    passPage = 1,
}: {
    passBlogs?: any[]
    passPagination?: any
    passPage?: number | string
} = {}) => {
    const [list, setList] = useState(passBlogs)

    const [pagination, setPagination] = useState(passPagination)

    const [search, setSearch] = useState<any>({
        page: passPage,
        limit: 12,
    })

    const [isLoading, setIsLoading] = useState(false)

    const _handleGet = (passSearch = {}) => {
        setIsLoading(true)
        getBlogList({
            ...search,
            ...passSearch,
        }).then((res) => {
            setIsLoading(false)

            setList(res?.result || [])
            setPagination(res?.pagination || {})
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
        if (passBlogs.length < 1) {
            const startPage = 1
            // @ts-ignore
            _handleChangePage(startPage)
        }
    }, [])

    return {
        list,
        isLoading,
        setList,
        _handleChangePage,
        pagination: pagination,
    }
}

export default useBlogs
