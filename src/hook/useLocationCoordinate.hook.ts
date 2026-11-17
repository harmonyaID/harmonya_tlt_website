'use client'
import { useMemo } from 'react'

type CoordinateValue = number | string | null | undefined

export interface LocationCoordinateSource {
    latitude?: CoordinateValue
    longitude?: CoordinateValue
    [key: string]: any
}

const toCoordinate = (value: CoordinateValue): number | null => {
    if (value === null || value === undefined || value === '') return null
    const n = Number(value)
    return Number.isFinite(n) ? n : null
}

// Ex: const { hasLocation, latitude, longitude, mapEmbedUrl } =
//         useLocationCoordinate(detail?.addresses?.[0])
const useLocationCoordinate = (
    source?: LocationCoordinateSource | null,
    zoom: number = 15,
) => {
    return useMemo(() => {
        const latitude = toCoordinate(source?.latitude)
        const longitude = toCoordinate(source?.longitude)
        const hasLocation = latitude !== null && longitude !== null

        return {
            hasLocation,
            latitude,
            longitude,
            mapEmbedUrl: hasLocation
                ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`
                : '',
        }
    }, [source?.latitude, source?.longitude, zoom])
}

export default useLocationCoordinate
