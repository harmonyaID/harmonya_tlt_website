import { ReactNode, ElementType } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export const TitleContentText = ({
    children,
    className = '',
    as: Component = 'h2',
}: {
    children?: ReactNode
    className?: string
    as?: ElementType
}) => (
    <div
        className={joinClassNameHelper(
            'wp-font-tt-drugs text-grey-200 fs-48',
            className,
        )}>
        <Component className="mb-0">{children}</Component>
    </div>
)

export const DescriptionContentText = ({
    children,
    className = '',
    as: Component = 'p',
}: {
    children?: ReactNode
    className?: string
    as?: ElementType
}) => (
    <div
        className={joinClassNameHelper(
            'fs-20 fw-light text-grey-400',
            className,
        )}>
        <Component className="mb-0">{children}</Component>
    </div>
)
