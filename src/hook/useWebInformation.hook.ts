import { useEffect, useState } from 'react'
import { getWebInformation } from '@/service/api/contact.api'

const CACHE_KEY = 'web_information'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const useWebInformation = () => {
    const [webInformation, setWebInformation] = useState(null)

    interface CacheData<T> {
        data: T
        expiresAt: number
    }

    const getCachedWebInformation = async () => {
        // Check cache
        const cached = localStorage.getItem(CACHE_KEY)

        if (cached) {
            const parsed: CacheData<any> = JSON.parse(cached)

            if (Date.now() < parsed.expiresAt) {
                return parsed.data
            }

            localStorage.removeItem(CACHE_KEY)
        }

        // Fetch fresh data
        const data = await getWebInformation()
        const result = data?.result

        // Save cache
        const cacheData: CacheData<typeof result> = {
            data: result,
            expiresAt: Date.now() + CACHE_DURATION,
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

        return result
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCachedWebInformation()
                setWebInformation(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return {
        __webInformation: webInformation,
    }
}

export default useWebInformation
