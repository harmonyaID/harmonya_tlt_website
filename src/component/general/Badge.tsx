import { ReactNode } from 'react'

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
