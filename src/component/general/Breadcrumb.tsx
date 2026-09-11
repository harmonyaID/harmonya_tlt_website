'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

/**
 * Auto Breadcrumb (Next.js App Router)
 * ------------------------------------
 * 100% otomatis dari URL, tidak perlu setting apa-apa.
 *
 *   /about                -> Home / About
 *   /blog                 -> Home / Blog
 *   /blog/mindful-travel   -> Home / Blog / Mindful Travel
 *
 * Untuk halaman detail (mis. /blog/[slug]) yang judul aslinya
 * beda dari slug URL, tinggal kirim prop `title` — cukup satu
 * string, tidak perlu mapping path:
 *
 *   <Breadcrumb title={post.title} />
 *   -> Home / Blog / Mindful Travel Tips To Nusa Lembongan
 */

type BreadcrumbProps = {
    /** Opsional: label untuk segment TERAKHIR (biasanya judul halaman/post) */
    title?: string
    /** Opsional: label untuk item pertama, default "Home" */
    homeLabel?: string
    className?: string

    isLabelHome?: boolean
}

function formatSegment(segment: string) {
    return decodeURIComponent(segment)
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function Breadcrumb({
    title,
    homeLabel = 'Home',
    className = '',
    isLabelHome = false,
}: BreadcrumbProps) {
    const pathname = usePathname() || '/'
    const segments = pathname.split('/').filter(Boolean)

    // Kalau di halaman root ("/"), cukup tampilkan "Home" saja
    if (segments.length === 0) {
        return (
            <nav aria-label="Breadcrumb" className={className}>
                <ol className="flex items-center gap-2 text-sm text-gray-500">
                    <li
                        className="text-gray-300 font-medium"
                        aria-current="page">
                        {homeLabel}
                    </li>
                </ol>
            </nav>
        )
    }

    const crumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        const isLast = index === segments.length - 1
        // segment terakhir pakai `title` kalau disediakan, sisanya auto-format dari URL
        const label = isLast && title ? title : formatSegment(segment)
        return { href, label, isLast }
    })

    const olClassName =
        'flex flex-wrap items-center gap-2 text-sm text-gray-500'

    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className={joinClassNameHelper('breadcrumb')}>
                {isLabelHome ? (
                    <li className="breadcrumb-item">
                        <Link
                            href="/"
                            className="text-gray-300 transition-colors">
                            {homeLabel}
                        </Link>
                    </li>
                ) : null}

                {crumbs.map(({ href, label, isLast }) => (
                    <Fragment key={href}>
                        {/*<li*/}
                        {/*    // aria-hidden="true"*/}
                        {/*    className="breadcrumb-item text-gray-300">*/}
                        {/*    /*/}
                        {/*</li>*/}
                        <li className="breadcrumb-item" aria-current="page">
                            {isLast ? (
                                <span className="text-gray-300 font-medium">
                                    {label}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="text-gray-300 transition-colors">
                                    {label}
                                </Link>
                            )}
                        </li>
                    </Fragment>
                ))}
            </ol>
        </nav>
    )
}
