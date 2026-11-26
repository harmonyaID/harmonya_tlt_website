'use client'
import { useMemo, useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// Baca JSON dari sessionStorage tanpa hydration mismatch.
// `isReady` false saat render server / sebelum hydrate.
const useSessionStorageJson = <T>(key: string) => {
    const raw = useSyncExternalStore<string | null | undefined>(
        subscribe,
        () => {
            try {
                return sessionStorage.getItem(key)
            } catch {
                return null
            }
        },
        () => undefined,
    )

    const value = useMemo<T | null>(() => {
        if (!raw) return null
        try {
            return JSON.parse(raw) as T
        } catch {
            return null
        }
    }, [raw])

    return { value, isReady: raw !== undefined }
}

export default useSessionStorageJson
