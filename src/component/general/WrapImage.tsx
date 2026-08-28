import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export const WrapImageHoverOverlay = ({
    children,
    className,

    contentOverlay,
}: {
    children?: ReactNode
    contentOverlay?: ReactNode
    className?: string
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'wp-image-hover-overlay-black',
                className,
            )}>
            {children}

            <div className="overlay-black">{contentOverlay}</div>
        </div>
    )
}
