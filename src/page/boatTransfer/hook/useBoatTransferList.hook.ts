import { useEffect, useState } from 'react'
import { getPropertyList } from '@/service/api/property.api'
import { getBoatList } from '@/service/api/boatTransfer.api'

const useBoatTransferList = ({ typeId }: { typeId: number }) => {
    const [list, setList] = useState([])
    const [pagination, setPagination] = useState({})
    const [search, setSearch] = useState({
        page: 1,
        limit: 30,
        typeId: typeId,
    })
    const [isLoading, setIsLoading] = useState(false)

    const _handleGet = (passSearch = {}) => {
        setIsLoading(true)
        getBoatList(passSearch)
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
    }
}

export default useBoatTransferList
