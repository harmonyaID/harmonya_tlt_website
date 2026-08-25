import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export const BadgeTag = ({
    value = '',
    children,
    className = '',
}: {
    children?: ReactNode
    value?: string
    className?: string
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'badge text-bg-green-100 rounded-pill fw-300',
                className,
            )}>
            {value || children}
        </div>
    )
}

export const BadgeRow = ({
    badges = [],
    className = '',
    classNameBadge = '',
}: {
    badges?: any[]
    className?: string
    classNameBadge?: string
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'hstack gap-2 flex-wrap',
                className,
            )}>
            {/*@ts-ignore*/}
            {badges.map((value, index) => (
                <BadgeTag key={index} className={classNameBadge}>
                    {value.name}
                </BadgeTag>
            ))}
        </div>
    )
}
