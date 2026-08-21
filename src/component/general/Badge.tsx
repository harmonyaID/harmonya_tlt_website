import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export const BadgeTag = ({
    value = '',
    children,
}: {
    children?: ReactNode
    value?: string
    className?: string
}) => {
    return (
        <div className="badge text-bg-green-100 rounded-pill fw-300">
            {value || children}
        </div>
    )
}

export const BadgeRow = ({
    badges = [],
    className = '',
}: {
    badges?: any[]
    className?: string
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'hstack gap-2 flex-wrap',
                className,
            )}>
            {/*@ts-ignore*/}
            {badges.map((value, index) => (
                <BadgeTag key={index}>{value.name}</BadgeTag>
            ))}
        </div>
    )
}
