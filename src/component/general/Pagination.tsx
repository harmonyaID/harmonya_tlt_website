'use client'

import { MouseEvent } from 'react'
import '@/asset/theme/base/_pagination.scss'
import IconChevronLeft from '@/component/icon/IconChevronLeft'
import IconChevronRight from '@/component/icon/IconChevronRight'

export interface PaginationLinks {
    next?: number
    previous?: number
}

export interface PaginationData {
    count?: number
    total?: number
    currentPage: number
    perPage?: number
    totalPage: number
    links?: PaginationLinks
}

interface PaginationProps {
    pagination: PaginationData
    onPageChange: (page: number) => void
    siblingCount?: number
}

/**
 * Menentukan daftar nomor halaman yang ditampilkan, dengan ellipsis ("...")
 * jika totalPage besar. Contoh: 1 2 3 4 5 ... 11
 */
function getVisiblePages(
    current: number,
    total: number,
    siblingCount = 4,
): (number | '...')[] {
    const totalNumbersShown = siblingCount + 2
    if (total <= totalNumbersShown + 1) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: (number | '...')[] = []

    let start = 1
    let end = siblingCount + 1

    if (current > end - 1) {
        start = Math.max(1, current - Math.floor(siblingCount / 2))
        end = start + siblingCount
        if (end >= total) {
            end = total - 1
            start = Math.max(1, end - siblingCount)
        }
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (end < total - 1) {
        pages.push('...')
    }

    pages.push(total)

    return pages
}

export default function Pagination({
    pagination,
    onPageChange,
    siblingCount = 4,
}: PaginationProps) {
    const { currentPage, totalPage } = pagination

    const pages = getVisiblePages(currentPage, totalPage, siblingCount)

    const prevPage = pagination.links?.previous ?? currentPage - 1
    const nextPage = pagination.links?.next ?? currentPage + 1

    const isFirst = currentPage <= 1
    const isLast = currentPage >= totalPage

    function handleClick(e: MouseEvent, page: number, disabled?: boolean) {
        e.preventDefault()
        if (disabled || page === currentPage) return
        onPageChange(page)
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination-circle justify-content-center mb-0">
                {/* Previous */}
                <li
                    className={`page-item nav-arrow${isFirst ? ' disabled' : ''}`}>
                    <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={(e) => handleClick(e, prevPage, isFirst)}>
                        <IconChevronLeft />
                    </a>
                </li>

                {/* Page numbers */}
                {pages.map((p, idx) =>
                    p === '...' ? (
                        <li
                            key={`ellipsis-${idx}`}
                            className="page-item ellipsis">
                            <a
                                className="page-link"
                                href="#"
                                onClick={(e) => e.preventDefault()}>
                                &hellip;
                            </a>
                        </li>
                    ) : (
                        <li
                            key={`ellipsis-${idx}`}
                            className={`page-item${p === currentPage ? ' active' : ''}`}>
                            <a
                                className="page-link"
                                href="#"
                                aria-current={
                                    p === currentPage ? 'page' : undefined
                                }
                                onClick={(e) => handleClick(e, p)}>
                                {p}
                            </a>
                        </li>
                    ),
                )}

                {/* Next */}
                <li
                    className={`page-item nav-arrow${isLast ? ' disabled' : ''}`}>
                    <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={(e) => handleClick(e, nextPage, isLast)}>
                        <IconChevronRight />
                    </a>
                </li>
            </ul>
        </nav>
    )
}
