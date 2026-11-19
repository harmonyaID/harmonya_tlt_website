'use client'
import { useEffect, useState } from 'react'
import { getMenuNavigation } from '@/service/api/menu.api'

const CACHE_KEY = 'menu_navigation'
const CACHE_DURATION = 5 * 60 * 1000 // 5 menit

let inflight: Promise<any[]> | null = null

const readCache = (): any[] | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (!cached) return null
        const parsed = JSON.parse(cached)
        if (Date.now() < parsed.expiresAt) return parsed.data
        localStorage.removeItem(CACHE_KEY)
    } catch {}
    return null
}

// 1 request untuk semua navbar yang mount berdekatan (+ cache localStorage)
const fetchMenuItems = (): Promise<any[]> => {
    const cached = readCache()
    if (cached) return Promise.resolve(cached)

    if (!inflight) {
        inflight = getMenuNavigation()
            .then((res: any) => {
                const items = res?.result?.items || []
                if (items.length > 0) {
                    try {
                        localStorage.setItem(
                            CACHE_KEY,
                            JSON.stringify({
                                data: items,
                                expiresAt: Date.now() + CACHE_DURATION,
                            }),
                        )
                    } catch {}
                }
                return items
            })
            .finally(() => {
                inflight = null
            })
    }
    return inflight
}

const useMenuNavigation = () => {
    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        let active = true
        fetchMenuItems()
            .then((data) => active && setItems(data))
            .catch(() => {})
        return () => {
            active = false
        }
    }, [])

    return { items }
}

export default useMenuNavigation
