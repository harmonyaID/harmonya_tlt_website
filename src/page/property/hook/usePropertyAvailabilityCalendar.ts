'use client'
import { useCallback, useState } from 'react'
import { getCalendarListingGuestyV2 } from '@/service/api/guesty/guestyv2.api'
import { AvailabilityCalendarDay } from '@/component/general/type/availabilityCalendar.type'

// Ambil status per tanggal dari Guesty untuk range bulan yang sedang tampil.
// Hasil di-merge by date supaya navigasi bolak-balik tidak menghapus data lama.
const usePropertyAvailabilityCalendar = (guestyId: string = '') => {
    const [calendar, setCalendar] = useState<AvailabilityCalendarDay[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchCalendar = useCallback(
        (startDate: string, endDate: string) => {
            if (!guestyId) return
            setIsLoading(true)

            getCalendarListingGuestyV2(guestyId, { startDate, endDate })
                .then((res: any) => {
                    const days: any[] =
                        res?.data?.data?.days ||
                        res?.data?.days ||
                        res?.days ||
                        (Array.isArray(res?.data) ? res.data : [])

                    setCalendar((prev) => {
                        const map = new Map(prev.map((d) => [d.date, d]))
                        days.forEach((d) => {
                            if (d?.date)
                                map.set(d.date, {
                                    date: d.date,
                                    status: d.status,
                                })
                        })
                        return [...map.values()]
                    })
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false))
        },
        [guestyId],
    )

    return { calendar, isLoading, fetchCalendar }
}

export default usePropertyAvailabilityCalendar
