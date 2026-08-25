import joinClassNameHelper from '@/helper/joinClassName.helper'
import {
    BtnBaseProps,
    BtnLinkProps,
} from '@/component/general/type/button.type'
import LoadingSpinner from '@/component/loading/LoadingSpinner'
import Link from 'next/link'
import { ReactNode } from 'react'
// import IconArrow from '@/asset/image/icon/icon-arrow-btn.svg'

// Icon Arrow
const CodeIconArrow = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.8438 16.0078L18.1088 9.9998L12.8437 3.9918"
            stroke="white"
            strokeWidth="1.01897"
        />
        <line
            x1="18.1055"
            y1="9.96261"
            x2="1.89722"
            y2="9.96261"
            stroke="white"
            strokeWidth="1.01897"
        />
    </svg>
)

export const IconArrowGray = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.8438 16.0082L18.1089 10.0002L12.8438 3.99219"
            stroke="#847E7E"
            strokeWidth="1.01897"
        />
        <path
            d="M18.1057 9.96289H1.89746"
            stroke="#847E7E"
            strokeWidth="1.01897"
        />
    </svg>
)

export const BtnIcon = ({ children }: { children?: ReactNode }) => (
    <div className="hstack align-items-center gap-1">
        {children} <CodeIconArrow />
    </div>
)

// Button & Link

export const BtnBasic = ({
    type,
    className,
    isDisabled,
    isLoading,
    handle,
    children,
    ...rest
}: BtnBaseProps) => {
    return (
        <button
            type={type}
            className={joinClassNameHelper('btn', className)}
            disabled={isDisabled}
            onClick={handle}
            {...rest}>
            {children} {isLoading ? <LoadingSpinner /> : null}
        </button>
    )
}

export const BtnPrimary = ({
    type = 'button',
    className = '',
    isDisabled,
    isLoading,
    handle,
    children,
    isOutline,
    isIconArrow = false,
    ...rest
}: BtnBaseProps & { isIconArrow?: boolean }) => {
    const configBtnClass: string = isOutline
        ? 'btn-outline-primary'
        : 'btn-primary'

    return (
        <BtnBasic
            type={type}
            className={joinClassNameHelper(configBtnClass, className)}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={handle}
            {...rest}>
            {isIconArrow ? <BtnIcon>{children}</BtnIcon> : children}
        </BtnBasic>
    )
}

// Button Link
export const BtnLinkBasic = ({
    children,
    href = '#',
    className = '',
}: BtnLinkProps) => {
    return (
        <Link href={href} className={joinClassNameHelper('btn', className)}>
            {children}
        </Link>
    )
}

export const BtnLinkPrimary = ({
    children,
    href = '#',
    className = '',
    isOutline = false,
    isIconArrow = false,
}: BtnLinkProps & { isOutline?: boolean; isIconArrow?: boolean }) => {
    const configBtnClass: string = isOutline
        ? 'btn-outline-primary'
        : 'btn-primary'

    return (
        <BtnLinkBasic
            href={href}
            className={joinClassNameHelper(configBtnClass, className)}>
            {isIconArrow ? <BtnIcon>{children}</BtnIcon> : children}
        </BtnLinkBasic>
    )
}
