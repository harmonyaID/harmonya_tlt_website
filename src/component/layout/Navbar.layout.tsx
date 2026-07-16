'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IconSearchWhite from '@/asset/image/navbar/nav-icon-search-white.svg'
import IconSearchDefault from '@/asset/image/navbar/nav-icon-search.svg'
import LogoWhite from '@/asset/image/navbar/logo-white.svg'
import LogoDefault from '@/asset/image/navbar/logo-defualt.svg'
import { BtnPrimary } from '@/component/general/Button'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import actionModal from '@/helper/base/actionModal.helper'
import { MDGlobalSearchDat } from '@/config/modal.config'

const NavbarLayout = ({
    isBgTransparent = false,
}: {
    isBgTransparent?: boolean
}) => {
    // const [isScrolled, setIsScrolled] = useState(false)
    //
    // useEffect(() => {
    //     const handleScroll = () => {
    //         // Ubah angka 50 sesuai kebutuhan (jarak scroll sebelum berubah)
    //         if (window.scrollY > 50) {
    //             setIsScrolled(true)
    //         } else {
    //             setIsScrolled(false)
    //         }
    //     }
    //
    //     window.addEventListener('scroll', handleScroll)
    //
    //     // Cleanup listener saat komponen unmount
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [])

    // WAJIB mulai dari false, sama seperti hasil render di server
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={joinClassNameHelper(
                'top-0 z-3 position-fixed start-0 top-0 end-0 navbar-config',
                { 'navbar-scrolled': !isBgTransparent || isScrolled },
            )}>
            <div className="section-logo py-3">
                <div className="container">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <div className="icon-search col-md-2">
                            <div
                                role="button"
                                onClick={() => actionModal(MDGlobalSearchDat)}>
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
                        <div className="logo col-md-8 text-center">
                            <Link href="/">
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
                        <div className="cta col-md-2 text-end">
                            <BtnPrimary className="rounded-pill fs-14">
                                BUSINESS LISTING
                            </BtnPrimary>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-3">
                <div className="hstack gap-4 flex-row align-items-center justify-content-center">
                    <div className="">
                        <Link href="#">About Us</Link>
                    </div>
                    <div className="">
                        <Link href="#">Stay</Link>
                    </div>
                    <div className="">
                        <Link href="#">Boat Transfers</Link>
                    </div>
                    <div className="">
                        <Link href="#">Experience</Link>
                    </div>
                    <div className="">
                        <Link href="#">Experience</Link>
                    </div>
                    <div className="">
                        <Link href="#">Island Guide</Link>
                    </div>
                    <div className="">
                        <Link href="#">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLayout
