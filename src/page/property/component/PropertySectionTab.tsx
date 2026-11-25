'use client'
import { useEffect, useRef, useState } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export type PropertySectionTabItem = {
    id: string
    label: string
}

const EXTRA_OFFSET = 16

// tinggi navbar yang sedang menutupi bagian atas layar (saat fixed)
const getNavbarOffset = () => {
    const navbar = document.querySelector('.navbar-config') as HTMLElement
    if (!navbar) return 0
    const { position } = window.getComputedStyle(navbar)
    return position === 'fixed' || position === 'sticky'
        ? navbar.offsetHeight
        : 0
}

const PropertySectionTab = ({
    tabs = [],
}: {
    tabs?: PropertySectionTabItem[]
}) => {
    const [activeId, setActiveId] = useState(tabs[0]?.id || '')
    const listRef = useRef<HTMLDivElement>(null)
    const isClickScrolling = useRef(false)
    const clickTimeout = useRef<any>(null)

    // scroll ke section tanpa menambahkan "#" di URL
    const _handleClick = (id: string) => {
        const target = document.getElementById(id)
        if (!target) return

        setActiveId(id)
        isClickScrolling.current = true
        clearTimeout(clickTimeout.current)
        clickTimeout.current = setTimeout(() => {
            isClickScrolling.current = false
        }, 1000)

        // navbar berubah jadi fixed setelah scroll > 50 sehingga:
        // - navbar menutupi bagian atas layar (kurangi tinggi navbar)
        // - jika saat ini belum fixed, konten akan bergeser naik setinggi navbar
        const navbar = document.querySelector('.navbar-config') as HTMLElement
        const navbarHeight = navbar ? navbar.offsetHeight : 0
        const isNavbarFixed = getNavbarOffset() > 0
        const layoutShift = isNavbarFixed ? 0 : navbarHeight

        const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            layoutShift -
            EXTRA_OFFSET

        window.scrollTo({ top, behavior: 'smooth' })
    }

    // tandai tab aktif sesuai section yang sedang terlihat
    useEffect(() => {
        const handleScroll = () => {
            if (isClickScrolling.current) return

            const offset = getNavbarOffset() + EXTRA_OFFSET + 1
            let current = tabs[0]?.id || ''

            tabs.forEach((tab) => {
                const el = document.getElementById(tab.id)
                if (el && el.getBoundingClientRect().top - offset <= 0) {
                    current = tab.id
                }
            })

            setActiveId(current)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [tabs])

    useEffect(() => () => clearTimeout(clickTimeout.current), [])

    // pastikan tab aktif terlihat saat list di-scroll horizontal (mobile)
    useEffect(() => {
        const list = listRef.current
        const activeEl = list?.querySelector(
            `[data-tab-id="${activeId}"]`,
        ) as HTMLElement | null
        if (!list || !activeEl) return

        const left =
            activeEl.offsetLeft -
            list.clientWidth / 2 +
            activeEl.clientWidth / 2
        list.scrollTo({ left, behavior: 'smooth' })
    }, [activeId])

    if (!tabs.length) return null

    return (
        <div className="property-section-tab">
            <div className="container">
                <div className="property-section-tab-list" ref={listRef}>
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.id}
                            data-tab-id={tab.id}
                            className={joinClassNameHelper(
                                'property-section-tab-item',
                                { active: activeId === tab.id },
                            )}
                            onClick={() => _handleClick(tab.id)}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PropertySectionTab
