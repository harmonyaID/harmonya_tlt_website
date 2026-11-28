'use client'
import { useEffect, useState } from 'react'
import { getPropertyVariantList } from '@/service/api/propertyVariant.api'
import { getListingGuestyServerV2 } from '@/service/api/guesty/server/guestyServerV2.api'

// Guesty listing: 25 per halaman -> page 1 = skip 0, page 2 = skip 25, dst.
const GUESTY_LIMIT = 25

type QueryParams = { [key: string]: string | string[] | undefined }

const pickQuery = (value?: string | string[]) =>
    (Array.isArray(value) ? value[0] : value) || ''

const usePropertyVariantMainHook = (query: QueryParams = {}) => {
    // query dari hero search: /property-result?checkIn=&checkOut=&guests=&typeId=
    const checkIn = pickQuery(query.checkIn)
    const checkOut = pickQuery(query.checkOut)
    const guests = parseInt(pickQuery(query.guests), 10) || 0
    const typeId = pickQuery(query.typeId)

    // ada tanggal -> list difilter dari ketersediaan Guesty (guestyIds)
    // (filter tamu `minOccupancy` di Guesty hanya berlaku bersama tanggal)
    const isGuestySearch = !!(checkIn && checkOut)

    const [list, setList] = useState([])

    const [pagination, setPagination] = useState<any>({})

    const [search, setSearch] = useState<any>({
        page: 1,
        limit: 30,
        bathroom: '',
        bedroom: '',
        typeId,
        amenitiesId: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const _handleParamSearch = (passData: any) => {
        return passData ? [passData] : []
    }

    const _filterParams = (passSearch: any = {}) => ({
        ...passSearch,
        propertyTypeIds: _handleParamSearch(passSearch?.typeId),
        amenitiesCategoryIds: _handleParamSearch(passSearch?.amenitiesId),
    })

    // ---------- tanpa search: list CRM biasa ----------
    const _handleGetDefault = (passSearch: any = {}) => {
        setIsLoading(true)
        getPropertyVariantList(_filterParams(passSearch))
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

    // ---------- dari hero search: Guesty -> guestyIds -> list CRM ----------
    // 1. GET Guesty /v1/listings?limit=25&skip=(page-1)*25 (+ filter ketersediaan)
    // 2. _id listing -> guestyIds -> GET CRM /property-variants?guestyIds=...
    // 3. pagination dari `count` Guesty: totalPage = ceil(count / 25)
    const _handleGetGuesty = (passSearch: any = {}) => {
        const page = Math.max(1, Number(passSearch?.page) || 1)

        setIsLoading(true)
        getListingGuestyServerV2({
            limit: GUESTY_LIMIT,
            skip: (page - 1) * GUESTY_LIMIT,
            fields: '_id',
            available: {
                checkIn,
                checkOut,
                ...(guests > 0 ? { minOccupancy: guests } : {}),
            },
        })
            .then((res: any) => {
                const guestyIds: string[] = (res?.data?.results || [])
                    .map((item: any) => item?._id)
                    .filter(Boolean)
                const total = Number(res?.data?.count) || 0
                const totalPage = Math.max(1, Math.ceil(total / GUESTY_LIMIT))

                setPagination({
                    count: guestyIds.length,
                    total,
                    currentPage: page,
                    perPage: GUESTY_LIMIT,
                    totalPage,
                    links: {
                        next: Math.min(page + 1, totalPage),
                        previous: Math.max(page - 1, 1),
                    },
                })

                if (guestyIds.length === 0) {
                    setList([])
                    return
                }

                return getPropertyVariantList(
                    _filterParams({
                        ...passSearch,
                        page: 1,
                        limit: GUESTY_LIMIT,
                        guestyIds,
                    }),
                ).then((resList) => setList(resList?.result || []))
            })
            .catch((err) => {
                setList([])
                console.log('err: ', err)
            })
            .finally(() => setIsLoading(false))
    }

    const _handleGet = (passSearch: any = {}) =>
        isGuestySearch
            ? _handleGetGuesty(passSearch)
            : _handleGetDefault(passSearch)

    const _handleChangePage = (page: number | string) => {
        // batas halaman: 1 .. totalPage (tidak bisa lewat dari data Guesty)
        const totalPage = Number(pagination?.totalPage) || 1
        const nextPage = Math.min(Math.max(1, Number(page) || 1), totalPage)
        if (nextPage === Number(search.page)) return

        setSearch((prev: any) => {
            const newState = { ...prev }

            newState.page = nextPage

            _handleGet(newState)

            return newState
        })
    }

    const _handleChange = (name: string = '', value: any) => {
        setSearch((prevState) => {
            const newState = { ...prevState }
            newState[name] = value
            // filter berubah -> kembali ke halaman 1 (skip=0)
            if (isGuestySearch) newState.page = 1

            _handleGet(newState)

            return newState
        })
    }

    // query berubah -> komponen di-remount (key di PropertyVariantTemplate)
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

export default usePropertyVariantMainHook
