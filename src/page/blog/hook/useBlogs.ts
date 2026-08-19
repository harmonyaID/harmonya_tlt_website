'use client'
import { useState, useEffect } from 'react'
import { getBlogList } from '@/service/api/blog.api'

const useBlogs = ({ passBlogs = [], passPage = 1 }) => {
    const [list, setList] = useState(passBlogs)

    const [search, setSearch] = useState<any>({
        page: passPage,
    })

    const [isLoading, setIsLoading] = useState(false)

    const _handleGet = (passSearch = {}) => {
        setIsLoading(true)
        getBlogList({
            ...search,
            ...passSearch,
        }).then((res) => {
            setList(res?.result || [])
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
    }
}

export default useBlogs
