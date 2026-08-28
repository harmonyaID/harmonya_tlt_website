import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export const CarouselItem = ({
    children,
    className = '',
    isActive = false,
}: {
    children?: ReactNode
    className?: string
    isActive?: boolean
}) => (
    <div
        className={joinClassNameHelper('carousel-item', className, {
            active: isActive,
        })}>
        {children}
    </div>
)

export const CarouselDefaultWrap = ({
    items = [],
    children = '',
    className = '',
    id = 'carousel-default',
}: {
    children?: ReactNode
    className?: string
    items?: any[]
    id?: string
}) => {
    const targetId = '#' + id

    return (
        <div
            id={id}
            className={joinClassNameHelper('carousel slide', className)}
            data-bs-ride="carousel">
            <div className="carousel-inner">{children || items}</div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={targetId}
                data-bs-slide="prev">
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={targetId}
                data-bs-slide="next">
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
