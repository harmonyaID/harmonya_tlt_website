'use client'

import { useEffect, useState } from 'react'
import { getPropertyVariantList } from '@/service/api/propertyVariant.api'
import { getListingGuestyV2 } from '@/service/api/guesty/guestyv2.api'

const GUESTY_FIELDS =
    'nickname accommodates bedrooms bathrooms prices.basePrice prices.currency tags'

export interface PropertyAccommodationItem {
    id: string | number
    guestyId: string
    slug: string
    nickname: string
    coverPhoto?: string | null
    bedrooms?: number | null
    guests?: number | null
    tags: string[]
    price?: number | null
    currency?: string | null
}

// Accommodation = variant milik property ini (parentPropertyId) yang punya guestyId,
// lalu dilengkapi harga/kapasitas dari listing Guesty.
const usePropertyAccommodation = (propertyId?: string | number | null) => {
    const [result, setResult] = useState<{
        id: string | number
        list: PropertyAccommodationItem[]
    }>({ id: '', list: [] })

    useEffect(() => {
        if (!propertyId) return

        let ignore = false

        const load = async () => {
            const res: any = await getPropertyVariantList({
                limit: 0,
                parentPropertyId: propertyId,
            })

            // CRM belum memfilter di server, jadi disaring di sini
            const variants: any[] = (res?.result || []).filter(
                (v: any) =>
                    String(v?.parentPropertyId) === String(propertyId) &&
                    v?.guestyId,
            )
            if (!variants.length) return []

            let listingMap = new Map<string, any>()
            try {
                const guesty: any = await getListingGuestyV2({
                    ids: variants.map((v) => v.guestyId).join(','),
                    fields: GUESTY_FIELDS,
                    limit: variants.length,
                })
                const results =
                    guesty?.data?.results || guesty?.data?.data?.results || []
                listingMap = new Map(results.map((l: any) => [l._id, l]))
            } catch (err) {
                console.log(err)
            }

            return variants.map((v): PropertyAccommodationItem => {
                const l = listingMap.get(v.guestyId)
                const tags: string[] = (v.tags || [])
                    .map((t: any) => t?.name)
                    .filter(Boolean)

                return {
                    id: v.id,
                    guestyId: v.guestyId,
                    slug: v?.seo?.slug || '',
                    nickname: v.nickname || l?.nickname || '',
                    coverPhoto: v.coverPhoto,
                    bedrooms: v.bedrooms ?? l?.bedrooms ?? null,
                    guests: l?.accommodates ?? v.occupancy ?? null,
                    tags: tags.length ? tags : l?.tags || [],
                    price: l?.prices?.basePrice ?? null,
                    currency: l?.prices?.currency ?? null,
                }
            })
        }

        load()
            .then((list) => {
                if (!ignore) setResult({ id: propertyId, list: list || [] })
            })
            .catch((err) => {
                console.log(err)
                if (!ignore) setResult({ id: propertyId, list: [] })
            })

        return () => {
            ignore = true
        }
    }, [propertyId])

    const isCurrent = !!propertyId && result.id === propertyId

    return {
        list: isCurrent ? result.list : [],
        isLoading: !!propertyId && !isCurrent,
    }
}

export default usePropertyAccommodation
