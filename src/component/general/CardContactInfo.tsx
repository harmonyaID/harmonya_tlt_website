import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export const PointContactInfo = ({
    label,
    value,
    className,
    children = '',
}: {
    label?: string
    value?: string
    className?: string
    children?: ReactNode
}) => {
    return (
        <div className={joinClassNameHelper('vstack', className)}>
            <p className="fs-18 text-grey-400 fw-500 mb-0">{label}</p>
            {children ? (
                children
            ) : (
                <p className="fs-16 text-grey-400 fw-300 mb-0">{value}</p>
            )}
        </div>
    )
}

export const CardContactInfoMain = ({
    children,
    className = '',
}: {
    children?: ReactNode
    className?: string
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'px-5 py-4 border border-neutral-200 rounded-4',
                className,
            )}>
            {children}
        </div>
    )
}
