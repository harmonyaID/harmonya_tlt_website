import joinClassNameHelper from '@/helper/joinClassName.helper'
import {
    BtnBaseProps,
    BtnLinkProps,
} from '@/component/general/type/button.type'
import LoadingSpinner from '@/component/loading/LoadingSpinner'
import Link from 'next/link'

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
    ...rest
}: BtnBaseProps) => {
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
            {children}
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
}: BtnLinkProps & { isOutline?: boolean }) => {
    const configBtnClass: string = isOutline
        ? 'btn-outline-primary'
        : 'btn-primary'

    return (
        <BtnLinkBasic
            href={href}
            className={joinClassNameHelper(configBtnClass, className)}>
            {children}
        </BtnLinkBasic>
    )
}
