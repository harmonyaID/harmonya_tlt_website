import {
    ButtonHTMLAttributes,
    MouseEvent,
    ReactNode,
    RefObject,
    CSSProperties,
    LinkHTMLAttributes,
} from 'react'

export interface BtnBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset'
    className?: string
    isDisabled?: boolean
    isLoading?: boolean
    handle?: (event: MouseEvent<HTMLButtonElement>) => void
    children?: ReactNode
    isOutline?: boolean
    action?: {
        onClick: (event: MouseEvent<HTMLButtonElement>) => void
    }
    [key: string]: any
}

export interface BtnLinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
    children?: ReactNode
    className?: string
    href?: string
    [key: string]: any
}
