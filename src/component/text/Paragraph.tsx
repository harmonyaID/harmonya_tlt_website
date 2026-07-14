import { ReactNode } from 'react'

export const SectionDescription = ({
    children,
    className,
}: {
    children?: ReactNode
    className?: string
}) => {
    return <p className={'text-grey-400 fs-20 mb-0 ' + className}>{children}</p>
}
