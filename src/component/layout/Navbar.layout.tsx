'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout'
import Image from 'next/image'
import Link from 'next/link'
import IconSearchWhite from '@/asset/image/navbar/nav-icon-search-white.svg'
import IconSearchDefault from '@/asset/image/navbar/nav-icon-search.svg'
import LogoWhite from '@/asset/image/navbar/logo-white.svg'
import LogoDefault from '@/asset/image/navbar/logo-defualt.svg'
import {
    BtnBasic,
    BtnLinkBasic,
    BtnLinkPrimary,
    BtnPrimary,
} from '@/component/general/Button'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import actionModal from '@/helper/base/actionModal.helper'
import { MDGlobalSearchDat } from '@/config/modal.config'
import { isEmpty } from 'lodash'
import IconArrowBottom2 from '@/component/icon/IconArrowBottom2'
import loadBootstrapHelper from '@/helper/base/loadBootstrap.helper'
import BannerMegaMenu from '@/asset/image/default/default-mega-menu-banner-image.jpg'
import {
    ABOUT_US_PATH,
    BOAT_TRANSFERS_PATH,
    CONTACT_US_PATH,
    HOME_PATH,
    SEARCH_PATH,
    STAY_PATH,
} from '@/config/pagePath.config'
import {
    ABOUT_US_MENU,
    BOAT_TRANSFERS_MENU,
    CONTACT_MENU,
    EXPERIENCE_MENU,
    ISLAND_GUIDE_MENU,
    STAY_MENU,
} from '@/config/pageMenu.config'
import { Search, X } from 'feather-icons-react'
import { slugify } from '@/helper/slugify.helper'
import { useRouter } from 'next/navigation'
import useMenuNavigation from '@/hook/useMenuNavigation.hook'

const MEGA_MENU_TYPE = 'Mega Menu'

const isMegaMenu = (item: any) => item?.type?.name === MEGA_MENU_TYPE

// Dipakai selama data API belum tampil / gagal dimuat
const FALLBACK_MENUS = [
    { menuLabel: ABOUT_US_MENU, menuUrl: ABOUT_US_PATH },
    { menuLabel: STAY_MENU, menuUrl: STAY_PATH },
    { menuLabel: BOAT_TRANSFERS_MENU, menuUrl: BOAT_TRANSFERS_PATH },
    { menuLabel: EXPERIENCE_MENU, menuUrl: '/experience' },
    { menuLabel: ISLAND_GUIDE_MENU, menuUrl: '/island-guide' },
    { menuLabel: CONTACT_MENU, menuUrl: CONTACT_US_PATH },
]

const LabelGroup = ({
    name = '',
    url = '',
}: {
    name?: string
    url?: string
}) =>
    url ? (
        <Link href={url} className="fs-24 font-tt-drugs d-block">
            {name}
        </Link>
    ) : (
        <p className="fs-24 font-tt-drugs mb-0">{name}</p>
    )

const GroupMegaMenu = ({ group }: { group: any }) => (
    <div className="vstack gap-3">
        <LabelGroup name={group.menuLabel} url={group.menuUrl} />
        {group.children?.map((child: any) => (
            <Link href={child.menuUrl || '#'} className="fs-16" key={child.id}>
                {child.menuLabel}
            </Link>
        ))}
    </div>
)

// Struktur mega menu dari API:
// - child type "Menu"      -> grup (label) + children sebagai link
// - child type "Mega Menu" -> blok promo (judul, deskripsi, banner dari children[0])
const MegaMenuItem = ({ item }: { item: any }) => {
    const groups = (item.children || []).filter((c: any) => !isMegaMenu(c))
    const promo = (item.children || []).find((c: any) => isMegaMenu(c))
    const banner = promo?.children?.[0]

    const half = Math.ceil(groups.length / 2)
    const columns = [groups.slice(0, half), groups.slice(half)]

    return (
        <div className="dropdown navbar-menga-menu">
            <a
                className="nav-link dropdown-toggle text-uppercase font-tt-drugs"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false">
                {item.menuLabel} <IconArrowBottom2 />
            </a>
            <div className="dropdown-menu w-100 rounded-0 py-5 px-4 mt-2">
                <div className="container">
                    <div className="row g-5 justify-content-end">
                        <div
                            className={
                                promo ? 'col-md-6 border-end' : 'col-12'
                            }>
                            <div className="row gx-3 gy-5">
                                {columns.map((col, index) => (
                                    <div
                                        className="col-md-6 vstack gap-5"
                                        key={index}>
                                        {col.map((group: any) => (
                                            <GroupMegaMenu
                                                group={group}
                                                key={group.id}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {promo ? (
                            <div className="col-md-5 px-md-5">
                                <div className="ps-3">
                                    <LabelGroup
                                        name={promo.menuLabel}
                                        url={promo.menuUrl}
                                    />
                                    {promo.description ? (
                                        <p className="fs-16 mt-2 mb-5">
                                            {promo.description}
                                        </p>
                                    ) : null}

                                    {banner ? (
                                        <Link
                                            href={banner.menuUrl || '#'}
                                            className="wrap-banner-img d-block">
                                            <Image
                                                src={
                                                    banner.featuredImage ||
                                                    BannerMegaMenu
                                                }
                                                alt={banner.menuLabel}
                                                className="object-fit-cover"
                                                fill
                                            />
                                            <div className="message text-white p-5">
                                                <p className="fs-24 font-tt-drugs mb-0">
                                                    {banner.menuLabel}
                                                </p>
                                            </div>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ================= MOBILE MENU (< 992px) =================
const MobileMegaMenuItem = ({
    item,
    isOpen,
    onToggle,
}: {
    item: any
    isOpen: boolean
    onToggle: () => void
}) => {
    const groups = (item.children || []).filter((c: any) => !isMegaMenu(c))

    return (
        <div
            className={joinClassNameHelper('nav-mobile-item', {
                'is-open': isOpen,
            })}>
            <button
                type="button"
                className="nav-mobile-link nav-mobile-toggle"
                aria-expanded={isOpen}
                onClick={onToggle}>
                <span>{item.menuLabel}</span>
                <span className="nav-mobile-chevron">
                    <IconArrowBottom2 />
                </span>
            </button>
            <div className="nav-mobile-submenu">
                <div className="nav-mobile-submenu-inner">
                    <div className="vstack gap-4 pt-3 pb-2 ps-3">
                        {groups.map((group: any) => (
                            <GroupMegaMenu group={group} key={group.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MobilePromo = ({ promo }: { promo: any }) => {
    const banner = promo?.children?.[0]

    return (
        <div className="nav-mobile-promo">
            <LabelGroup name={promo.menuLabel} url={promo.menuUrl} />
            {promo.description ? (
                <p className="fs-14 mt-2 mb-4">{promo.description}</p>
            ) : null}
            {banner ? (
                <Link
                    href={banner.menuUrl || '#'}
                    className="nav-mobile-banner d-block">
                    <Image
                        src={banner.featuredImage || BannerMegaMenu}
                        alt={banner.menuLabel}
                        className="object-fit-cover"
                        fill
                    />
                    <div className="message text-white p-3">
                        <p className="fs-20 font-tt-drugs text-uppercase mb-0">
                            {banner.menuLabel}
                        </p>
                    </div>
                </Link>
            ) : null}
        </div>
    )
}

const NavbarMobileMenu = ({
    isOpen,
    onClose,
    navItems,
}: {
    isOpen: boolean
    onClose: () => void
    navItems: any[]
}) => {
    const [openId, setOpenId] = useState<any>(null)

    // promo dari mega menu yang sedang dibuka, default promo pertama
    const promoSource =
        navItems.find((item) => item.id === openId) ||
        navItems.find((item) =>
            (item.children || []).some((c: any) => isMegaMenu(c)),
        )
    const promo = (promoSource?.children || []).find((c: any) => isMegaMenu(c))

    return (
        <CreatePortalLayout>
            <div
                className={joinClassNameHelper('navbar-mobile-menu', {
                    show: isOpen,
                })}
                aria-hidden={!isOpen}
                role="dialog"
                aria-modal="true">
                <div className="navbar-mobile-menu-header">
                    <button
                        type="button"
                        className="navbar-hamburger is-active"
                        aria-label="Close menu"
                        onClick={onClose}>
                        <X size={28} />
                    </button>
                    <div className="hstack gap-2">
                        <BtnLinkBasic
                            href={STAY_PATH}
                            className="rounded-pill fs-14 btn-outline-list-with-us">
                            LIST WITH US
                        </BtnLinkBasic>
                        <BtnLinkPrimary
                            href="#"
                            className="rounded-pill text-white fs-14">
                            BOOK NOW
                        </BtnLinkPrimary>
                    </div>
                </div>

                <div className="navbar-mobile-menu-body">
                    <div className="nav-mobile-list">
                        {navItems.length > 0
                            ? navItems.map((item) =>
                                  isMegaMenu(item) && item.children?.length ? (
                                      <MobileMegaMenuItem
                                          key={item.id}
                                          item={item}
                                          isOpen={openId === item.id}
                                          onToggle={() =>
                                              setOpenId(
                                                  openId === item.id
                                                      ? null
                                                      : item.id,
                                              )
                                          }
                                      />
                                  ) : (
                                      <div
                                          className="nav-mobile-item"
                                          key={item.id}>
                                          <Link
                                              href={item.menuUrl || '#'}
                                              className="nav-mobile-link"
                                              onClick={onClose}>
                                              {item.menuLabel}
                                          </Link>
                                      </div>
                                  ),
                              )
                            : FALLBACK_MENUS.map((item) => (
                                  <div
                                      className="nav-mobile-item"
                                      key={item.menuLabel}>
                                      <Link
                                          href={item.menuUrl}
                                          className="nav-mobile-link"
                                          onClick={onClose}>
                                          {item.menuLabel}
                                      </Link>
                                  </div>
                              ))}
                    </div>

                    {promo ? (
                        <>
                            <hr className="nav-mobile-divider" />
                            <MobilePromo promo={promo} />
                        </>
                    ) : null}
                </div>
            </div>
        </CreatePortalLayout>
    )
}

const NavbarLayout = ({
    isBgTransparent = false,
    isStartFix = true,
    menus = {
        items: [],
    },
    isInSearch = false,
}: {
    isBgTransparent?: boolean
    isStartFix?: boolean
    menus?: {
        items?: any[]
        [key: string]: any
    }
    isInSearch?: boolean
}) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { items: navItems } = useMenuNavigation()
    const router = useRouter()
    const pathname = usePathname()
    const [prevPathname, setPrevPathname] = useState(pathname)

    // tutup menu mobile saat pindah halaman
    if (prevPathname !== pathname) {
        setPrevPathname(pathname)
        setIsMobileMenuOpen(false)
    }

    const [formRequest, setFormRequest] = useState({
        search: '',
    })

    const _handleDropdownMegaMenu = async () => {
        const { Dropdown } = await loadBootstrapHelper()

        const allDropdowns = document.querySelectorAll(
            '.navbar-menga-menu.dropdown',
        )
        const instances: {
            el: Element
            dd: any
            timeout: any
            menu: Element | null
        }[] = []

        allDropdowns.forEach(function (dropdown) {
            const toggleEl = dropdown.querySelector('.dropdown-toggle')
            if (!toggleEl) return

            const dd = Dropdown.getOrCreateInstance(toggleEl)
            const menu = dropdown.querySelector('.dropdown-menu')
            const state = { el: dropdown, dd, timeout: null as any, menu }
            instances.push(state)

            dropdown.addEventListener('mouseenter', function () {
                if (window.innerWidth < 992) return
                clearTimeout(state.timeout)

                // tutup dropdown lain yang SEDANG terbuka -> tanpa animasi (instan)
                instances.forEach((other) => {
                    if (other === state) return
                    clearTimeout(other.timeout)

                    if (other.menu?.classList.contains('show')) {
                        other.menu.classList.add('no-transition')
                        other.dd.hide()
                        // lepas class no-transition setelah 1 frame,
                        // supaya transition normal aktif lagi untuk kondisi berikutnya
                        requestAnimationFrame(() => {
                            other.menu?.classList.remove('no-transition')
                        })
                    } else {
                        other.dd.hide()
                    }
                })

                dd.show() // ini tetap fade-in mulus seperti biasa
            })

            dropdown.addEventListener('mouseleave', function () {
                if (window.innerWidth < 992) return
                state.timeout = setTimeout(function () {
                    dd.hide() // fade-out normal, karena user benar2 keluar
                }, 200)
            })
        })
    }

    const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormRequest({ search: value })
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    // kunci scroll body, tutup dengan Escape / saat layar >= lg
    useEffect(() => {
        if (!isMobileMenuOpen) return

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false)
        }
        const handleResize = () => {
            if (window.innerWidth >= 992) setIsMobileMenuOpen(false)
        }

        window.addEventListener('keydown', handleKey)
        window.addEventListener('resize', handleResize)
        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener('keydown', handleKey)
            window.removeEventListener('resize', handleResize)
        }
    }, [isMobileMenuOpen])

    // pasang hover dropdown setelah mega menu dari API dirender
    useEffect(() => {
        if (navItems.length > 0) _handleDropdownMegaMenu()
    }, [navItems])

    return (
        <nav
            className={joinClassNameHelper(
                'top-0 z-3 start-0 top-0 end-0 navbar-config',
                {
                    'position-fixed': isScrolled ? true : isStartFix,
                    'navbar-scrolled': !isBgTransparent || isScrolled,
                },
            )}>
            {/* ===== MOBILE BAR (< 992px) ===== */}
            <div className="navbar-mobile-bar d-lg-none">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between py-3">
                        <button
                            type="button"
                            className="navbar-hamburger"
                            aria-label="Open menu"
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(true)}>
                            <span />
                            <span />
                        </button>
                        <div className="logo">
                            <Link href={HOME_PATH}>
                                <Image
                                    src={LogoWhite}
                                    className="logo-white"
                                    alt="the lembongan"
                                />
                                <Image
                                    src={LogoDefault}
                                    className="logo-default"
                                    alt="the lembongan"
                                />
                            </Link>
                        </div>
                        <div className="icon-search">
                            {isInSearch ? (
                                <div
                                    role="button"
                                    onClick={() =>
                                        actionModal(MDGlobalSearchDat, true)
                                    }>
                                    <X className="text-primary" size={26} />
                                </div>
                            ) : (
                                <div
                                    role="button"
                                    onClick={() =>
                                        actionModal(MDGlobalSearchDat)
                                    }>
                                    <Image
                                        src={IconSearchDefault}
                                        className="icon-search-default"
                                        alt="search"
                                    />
                                    <Image
                                        src={IconSearchWhite}
                                        className="icon-search-white"
                                        alt="search"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <NavbarMobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navItems={navItems}
            />

            {/* ===== DESKTOP (>= 992px) ===== */}
            <div className="section-logo py-3 d-none d-lg-block">
                <div className="container">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <div className="col-md-2">
                            <BtnLinkBasic
                                href={STAY_PATH}
                                className={joinClassNameHelper(
                                    'rounded-pill fs-14',
                                    {
                                        'btn-outline-white': isBgTransparent
                                            ? !isScrolled
                                            : false,
                                        'btn-outline-list-with-us':
                                            isScrolled || !isBgTransparent,
                                    },
                                )}>
                                LIST WITH US
                            </BtnLinkBasic>
                        </div>
                        <div className="logo col-md-8 text-center">
                            <Link href={HOME_PATH}>
                                <Image
                                    src={LogoWhite}
                                    className="logo-white"
                                    alt="the lembongan"
                                />
                                <Image
                                    src={LogoDefault}
                                    className="logo-default"
                                    alt="the lembongan"
                                />
                            </Link>
                        </div>
                        <div className="cta col-md-2 text-end hstack gap-4 justify-content-end">
                            <div className="icon-search">
                                {isInSearch ? (
                                    <div
                                        role="button"
                                        onClick={() =>
                                            actionModal(MDGlobalSearchDat, true)
                                        }>
                                        <X className="text-primary" size={28} />
                                    </div>
                                ) : (
                                    <div
                                        role="button"
                                        onClick={() =>
                                            actionModal(MDGlobalSearchDat)
                                        }>
                                        <Image
                                            src={IconSearchDefault}
                                            className="icon-search-default"
                                            alt="the lembongan"
                                        />
                                        <Image
                                            src={IconSearchWhite}
                                            className="icon-search-white"
                                            alt="the lembongan"
                                        />
                                    </div>
                                )}
                            </div>
                            <BtnLinkPrimary
                                href="#"
                                className="rounded-pill text-white fs-14">
                                BOOK NOW
                            </BtnLinkPrimary>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-3 d-none d-lg-block">
                <div className="hstack flex-wrap h-gap-menu flex-row align-items-center justify-content-center">
                    {navItems.length > 0
                        ? navItems.map((item) => {
                              return isMegaMenu(item) &&
                                  item.children?.length ? (
                                  <MegaMenuItem key={item.id} item={item} />
                              ) : (
                                  <div
                                      className="text-uppercase font-tt-drugs"
                                      key={item.id}>
                                      <Link href={item.menuUrl || '#'}>
                                          {item.menuLabel}
                                      </Link>
                                  </div>
                              )
                          })
                        : FALLBACK_MENUS.map((item) => (
                              <div
                                  className="text-uppercase font-tt-drugs"
                                  key={item.menuLabel}>
                                  <Link href={item.menuUrl}>
                                      {item.menuLabel}
                                  </Link>
                              </div>
                          ))}
                </div>
            </div>

            {isInSearch && (
                <div className="hstack w-100 justify-content-center">
                    <div className="position-relative search-input-container">
                        <span className="search-input-icon text-primary">
                            <Search />
                        </span>

                        <input
                            type="text"
                            className="rounded-pill w-100 search-input font-tt-drugs"
                            placeholder="SEARCH..."
                            onChange={_handleChange}
                            onKeyDown={(e) => {
                                if (
                                    e.key === 'Enter' &&
                                    formRequest.search?.trim()
                                ) {
                                    router.push(
                                        SEARCH_PATH +
                                            '/' +
                                            slugify(formRequest.search),
                                    )
                                    actionModal(MDGlobalSearchDat, true)
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavbarLayout
