'use client'
import { ReactNode } from 'react'
import LoadingSpinner from '@/component/loading/LoadingSpinner'

const LoadingBtn = ({
    children,
    isLoading = false,
}: {
    children: ReactNode
    isLoading?: boolean
}) => {
    return (
        <div className="vstack gap-2">
            {children} {isLoading ? <LoadingSpinner /> : ''}
        </div>
    )
}

export default LoadingBtn
