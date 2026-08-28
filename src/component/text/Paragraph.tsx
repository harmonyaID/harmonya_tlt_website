import { HTMLAttributes, ReactNode } from 'react'

interface ParagraphProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode
    className?: string
}

export const SectionDescription = ({
    children,
    className,
    ...res
}: ParagraphProps) => {
    return (
        <p className={'text-grey-400 fs-20 mb-0 ' + className} {...res}>
            {children}
        </p>
    )
}
