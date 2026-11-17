import Image, { ImageProps } from 'next/image'
import ImageEmptyReel from '@/asset/image/default/image-empty-9-16.svg'
import { useState } from 'react'

interface ValidImageProps extends Omit<ImageProps, 'src'> {
    src?: ImageProps['src'] | null
    fallbackSrc?: ImageProps['src']
}

const ValidImage = ({
    src,
    fallbackSrc = ImageEmptyReel,
    onError,
    alt,
    ...props
}: ValidImageProps) => {
    const [hasError, setHasError] = useState(false)

    const imageSrc = hasError || !src ? fallbackSrc : src

    return (
        <Image
            {...props}
            alt={alt}
            src={imageSrc}
            onError={(e) => {
                setHasError(true)
                onError?.(e)
            }}
        />
    )
}

export default ValidImage
