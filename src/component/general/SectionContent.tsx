'use client'
import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const SectionContent = ({
    children,
    className = '',
    isBorderBottom = true,
}: {
    children?: ReactNode
    className?: string
    isBorderBottom?: boolean
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'pb-5 mb-5 text-grey-400',
                { 'border-bottom border-neutral-100': isBorderBottom },
                className,
            )}>
            {children}
        </div>
    )
}

export default SectionContent
