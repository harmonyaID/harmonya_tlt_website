import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

interface HeadingProps {
    children?: ReactNode
    className?: string
}

export const H1 = ({ children, className }: HeadingProps) => {
    return <h1 className={className}>{children}</h1>
}

export const H3 = ({ children, className }: HeadingProps) => {
    return <h3 className={className}>{children}</h3>
}

export const SectionTitle = ({ children, className }: HeadingProps) => {
    return (
        <h2 className={joinClassNameHelper('text-grey-200 mb-0', className)}>
            {children}
        </h2>
    )
}
