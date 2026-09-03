'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IconSearchWhite from '@/asset/image/navbar/nav-icon-search-white.svg'
import IconSearchDefault from '@/asset/image/navbar/nav-icon-search.svg'
import LogoWhite from '@/asset/image/navbar/logo-white.svg'
import LogoDefault from '@/asset/image/navbar/logo-defualt.svg'
import {
    BtnBasic,
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
import BannerMegaMenuEpx from '@/asset/image/default/default-mega-menu-banner-image-exp.jpg'
import { HOME_PATH } from '@/config/pagePath.config'

const LabelGroup = ({ name = '' }: { name?: string }) => (
    <p className="fs-24 font-tt-drugs mb-0">{name}</p>
)

const objectChildOfGroup = (name: string, url = '#') => ({ url, name })

const LinkChildOfGroup = ({
    url = '#',
    name = '',
}: {
    url?: string
    name?: string
}) => (
    <Link href={url} className="fs-16">
        {name}
    </Link>
)

const GroupMegaMenu = ({ name, list = [] }: { name: string; list?: any[] }) => {
    return (
        <div className="vstack gap-3">
            <LabelGroup name={name} />
            {list?.map((item, index) => {
                return <LinkChildOfGroup {...item} key={index} />
            })}
        </div>
    )
}

const NavbarLayout = ({
    isBgTransparent = false,
    isStartFix = true,
    menus = {
        items: [],
    },
}: {
    isBgTransparent?: boolean
    isStartFix?: boolean
    menus?: {
        items?: any[]
        [key: string]: any
    }
}) => {
    const [isScrolled, setIsScrolled] = useState(false)

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        handleScroll()

        _handleDropdownMegaMenu()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={joinClassNameHelper(
                'top-0 z-3 start-0 top-0 end-0 navbar-config',
                {
                    'position-fixed': isScrolled ? true : isStartFix,
                    'navbar-scrolled': !isBgTransparent || isScrolled,
                },
            )}>
            <div className="section-logo py-3">
                <div className="container">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <div className="col-md-2">
                            <BtnBasic
                                className={joinClassNameHelper(
                                    'rounded-pill fs-14',
                                    {
                                        'btn-outline-white': isBgTransparent
                                            ? !isScrolled
                                            : false,
                                        'btn-outline-neutral-500':
                                            isScrolled || !isBgTransparent,
                                    },
                                )}>
                                LIST WITH US
                            </BtnBasic>
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
            <div className="container py-3">
                <div className="hstack flex-wrap h-gap-menu flex-row align-items-center justify-content-center">
                    {!isEmpty(menus) && !isEmpty(menus.items) && false ? (
                        menus?.items?.map((vm, index) => {
                            return (
                                <div className="font-tt-drugs" key={index}>
                                    <Link href={vm.url || '#'}>{vm.name}</Link>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            <div className="text-uppercase font-tt-drugs">
                                <Link href="#">About Us</Link>
                            </div>
                            <div className="text-uppercase font-tt-drugs">
                                <Link href="#">Stay</Link>
                            </div>
                            <div className="text-uppercase font-tt-drugs">
                                <Link href="#">Boat Transfers</Link>
                            </div>
                            <div className="dropdown navbar-menga-menu">
                                <a
                                    className="nav-link dropdown-toggle text-uppercase font-tt-drugs"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Experience <IconArrowBottom2 />
                                </a>
                                <div className="dropdown-menu w-100 rounded-0 py-5 px-4 mt-2">
                                    <div className="container">
                                        <div className="row g-5 justify-content-centerP justify-content-end">
                                            <div className="col-md-6 border-end">
                                                <div className="row gx-3 gy-5">
                                                    <div className="col-md-6 vstack gap-5">
                                                        <GroupMegaMenu
                                                            name="EAT"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'JUNGUTBATU',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'NUSA CENINGAN',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'MUSHROOM & SANDY BY',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'ALL RESTAURANT',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />

                                                        <GroupMegaMenu
                                                            name="PLAY"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'OCEAN ADVENTURE',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'ADRENALINES',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'PADEL',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'TOURS',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'SHOPPING',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'BEACH CLUB',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className="col-md-6 vstack gap-5">
                                                        <GroupMegaMenu
                                                            name="WELLNESS"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'SPA DAY',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'YOGA',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'BREATH WORK',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'PILATES',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'JIUJITSU',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'GYM',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'SAUNA & ICE BATH',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />

                                                        <GroupMegaMenu
                                                            name="WEDDING & RETREATS"
                                                            list={[]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-5 px-md-5">
                                                <div className="ps-3">
                                                    <LabelGroup name="WHAT TO DO IN LEMBONGAN" />
                                                    <p className="fs-16 mt-2 mb-5 ">
                                                        Amazing diving spot,
                                                        meet the turtles sea
                                                        creatuires. Amazing
                                                        diving spot, meet the
                                                        turtles sea creatuires
                                                        Amazing diving spo
                                                    </p>

                                                    <div className="wrap-banner-img">
                                                        <Image
                                                            src={BannerMegaMenu}
                                                            alt="WHAT TO DO IN LEMBONGAN"
                                                            className="object-fit-cover"
                                                            fill
                                                        />

                                                        <div className="message text-white p-5">
                                                            <p className="fs-24 font-tt-drugs mb-0">
                                                                BALI HAI DIVING{' '}
                                                                <br />
                                                                ADVENTURES
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown navbar-menga-menu">
                                <a
                                    className="nav-link dropdown-toggle text-uppercase font-tt-drugs"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    ISLAND GUIDE <IconArrowBottom2 />
                                </a>
                                <div className="dropdown-menu w-100 rounded-0 py-5 px-4 mt-2">
                                    <div className="container">
                                        <div className="row g-5 justify-content-end">
                                            <div className="col-md-6 border-end">
                                                <div className="row gx-3 gy-5">
                                                    <div className="col-md-6">
                                                        <GroupMegaMenu
                                                            name="LEMBONGAN"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'GET TO KNOW LEMBONGAN',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'ISLAND’S FAQ',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <GroupMegaMenu
                                                            name="ISLAND TRANSPORT"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'MADE LEMBONGAN TRANSPORT',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'KADEK LEMBONGAN TAXI',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <GroupMegaMenu
                                                            name="ISLAND SERVICE"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'VICTORY CARGO',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <GroupMegaMenu
                                                            name="LEMBONGAN"
                                                            list={[
                                                                objectChildOfGroup(
                                                                    'GET TO KNOW LEMBONGAN',
                                                                    '#',
                                                                ),
                                                                objectChildOfGroup(
                                                                    'ISLAND’S FAQ',
                                                                    '#',
                                                                ),
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-5 px-md-5">
                                                <div className="ps-3">
                                                    <LabelGroup name="WHAT TO DO IN LEMBONGAN" />
                                                    <p className="fs-16 mt-2 mb-5">
                                                        Amazing diving spot,
                                                        meet the turtles sea
                                                        creatuires. Amazing
                                                        diving spot, meet the
                                                        turtles sea creatuires
                                                        Amazing diving spo
                                                    </p>

                                                    <div className="wrap-banner-img">
                                                        <Image
                                                            src={
                                                                BannerMegaMenuEpx
                                                            }
                                                            alt="WHAT TO DO IN LEMBONGAN"
                                                            className="object-fit-cover"
                                                            fill
                                                        />

                                                        <div className="message text-white p-5">
                                                            <p className="fs-24 font-tt-drugs mb-0">
                                                                BALI HAI DIVING{' '}
                                                                <br />
                                                                ADVENTURES
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-uppercase">
                                <Link href="#">Contact</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavbarLayout
