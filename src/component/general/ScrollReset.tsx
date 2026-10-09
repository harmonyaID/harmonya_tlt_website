'use client'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const ScrollReset = ({
    children,
    className,
}: {
    children?: ReactNode
    className?: string
}) => {
    const pathname = usePathname()
    const ref = useRef(null)

    useEffect(() => {
        // window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname])

    return (
        <main ref={ref} className={joinClassNameHelper('h-100', className)}>
            {children}
        </main>
    )
}

export default ScrollReset
