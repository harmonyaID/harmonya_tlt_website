import { ReactNode, HTMLAttributes } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode
    className?: string
}

export const H1 = ({ children, className }: HeadingProps) => {
    return <h1 className={className}>{children}</h1>
}

export const H3 = ({ children, className }: HeadingProps) => {
    return <h3 className={className}>{children}</h3>
}

export const SectionTitle = ({ children, className, ...res }: HeadingProps) => {
    return (
        <h2
            className={joinClassNameHelper('text-grey-200 mb-0', className)}
            {...res}>
            {children}
        </h2>
    )
}
