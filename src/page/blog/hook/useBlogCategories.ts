import { useEffect, useState } from 'react'
import { getBlogCategoryList, getBlogList } from '@/service/api/blog.api'

const useBlogCategories = () => {
    const [list, setList] = useState([])

    const _handleGet = (passSearch = {}) => {
        getBlogCategoryList()
            .then((res) => {
                setList(res?.result || [])
            })
            .catch((err) => {
                console.log('err: ', err)
            })
    }

    useEffect(() => {
        _handleGet()
    }, [])

    return {
        list,
    }
}

export default useBlogCategories
