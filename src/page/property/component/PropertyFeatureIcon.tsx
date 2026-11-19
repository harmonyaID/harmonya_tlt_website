import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'feather-icons-react'
import { ICON_FEATURE_MAP } from '@/config/iconProperty.config'

const isValidLink = (value?: string) => {
    if (!value || typeof value !== 'string') return false
    if (value.startsWith('/')) return true
    try {
        const { protocol } = new URL(value)
        return protocol === 'http:' || protocol === 'https:'
    } catch {
        return false
    }
}

// Prioritas: link icon (valid & berhasil dimuat) -> icon feature map -> icon centang
const PropertyFeatureIcon = ({
    icon,
    alt = 'Feature',
}: {
    icon?: string
    alt?: string
}) => {
    const [linkFailed, setLinkFailed] = useState(false)

    const mapSrc = icon ? ICON_FEATURE_MAP[String(icon).toLowerCase()] : null

    if (isValidLink(icon) && !linkFailed) {
        return (
            <div className="position-relative box-48">
                {/* <img> agar tidak terikat konfigurasi domain next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={icon}
                    alt={alt}
                    className="w-100 h-100 object-fit-contain"
                    onError={() => setLinkFailed(true)}
                />
            </div>
        )
    }

    if (mapSrc) {
        return (
            <div className="position-relative box-40">
                <Image
                    src={mapSrc}
                    alt={alt}
                    fill
                    className="object-fit-contain"
                />
            </div>
        )
    }

    return <CheckCircle size="42" strokeWidth="1.5" />
}

export default PropertyFeatureIcon
