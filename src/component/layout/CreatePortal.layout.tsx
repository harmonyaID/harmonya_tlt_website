'use client'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

const CreatePortalLayout = ({
    children,
    isUseBody = true,
}: {
    children?: ReactNode
    isUseBody?: boolean
}) => {
    // const rootElement = isUseBody
    //     ? window?.document?.body
    //     : window?.document?.getElementById('root')

    const rootElement =
        typeof window !== 'undefined'
            ? isUseBody
                ? window.document.body
                : window.document.getElementById('root')
            : null

    if (!rootElement) {
        return null
    }

    return createPortal(children, rootElement)
}

export default CreatePortalLayout
