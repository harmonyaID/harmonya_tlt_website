import Image from 'next/image'
import Link from 'next/link'
import LogoWhite from '@/asset/image/navbar/logo-white.svg'
import IconIG from '@/asset/image/footer/footer-icon-ig.svg'
import IconFB from '@/asset/image/footer/footer-icon-fb.svg'
import IconYoutube from '@/asset/image/footer/footer-icon-youtube.svg'
import {
    ABOUT_US_PATH,
    BLOG_PATH,
    COMMUNITY_PATH,
    CONTACT_US_PATH,
    COPYRIGHT_AND_LEGAL_NOTICE_PATH,
    FAQ_PATH,
    HOME_PATH,
    OFFER_PATH,
    PRIVACY_POLICY_PATH,
    PROPERTY_PATH,
    TERMS_AND_CONDITION_PATH,
    VILLA_MANAGEMENT_PATH,
} from '@/config/pagePath.config'

const shapeMenu = (name: string, href: any = '#') => ({
    name,
    href,
})

const FooterLayout = () => {
    const listMenusOne = [
        shapeMenu('ABOUT US', ABOUT_US_PATH),
        shapeMenu('PROPERTIES', PROPERTY_PATH),
        shapeMenu('OFFERS', OFFER_PATH),
        shapeMenu('VILLA MANAGEMENT', VILLA_MANAGEMENT_PATH),
        shapeMenu('COMMUNITY', COMMUNITY_PATH),
        shapeMenu('BLOG', BLOG_PATH),
        shapeMenu('CONTACT US', CONTACT_US_PATH),
    ]

    const listMenusTwo = [
        shapeMenu('FAQ', FAQ_PATH),
        shapeMenu('TERMS & CONDITION', TERMS_AND_CONDITION_PATH),
        shapeMenu('PRIVACY POLICY', PRIVACY_POLICY_PATH),
        shapeMenu('COPYRIGHT & LEGAL NOTICE', COPYRIGHT_AND_LEGAL_NOTICE_PATH),
    ]

    return (
        <section className="footer bg-grey-500 text-white">
            <div className="w-100 section-space-small border-bottom">
                <div className="container px-lg-5">
                    <Link href={HOME_PATH} className="text-center pb-5">
                        <Image
                            src={LogoWhite}
                            alt="the lembongan bali"
                            width="260"
                        />
                    </Link>

                    <div className="row gx-5 gy-3">
                        <div className="col-lg">
                            <p className="fs-20 mb-0">OUR OFFICE</p>
                            <p className="fs-16">(+62) 81 3921 83002</p>

                            <p className="fs-14 mb-0">
                                Nusa Lembongan, Jl. Jungutbatu, Jungutbatu, Kec.
                                Nusa Penida, Kabupaten Klungkung, Bali 80361
                            </p>
                        </div>

                        {/*<div className="col-lg-6">*/}
                        {/*    <div className="row justify-content-center">*/}
                        {/*        */}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="col-lg">
                            <ul className="list-unstyled list-group gap-2">
                                {listMenusOne.map((menu, index) => (
                                    <li key={index}>
                                        <Link
                                            className="text-white"
                                            href={menu.href}>
                                            {menu.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg">
                            <ul className="list-unstyled list-group gap-2">
                                {listMenusTwo.map((menu, index) => (
                                    <li key={index}>
                                        <Link
                                            className="text-white"
                                            href={menu.href}>
                                            {menu.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg">
                            <div className="vstack gap-3">
                                <div className="vstack gap-1">
                                    <p className="mb-0 fs-16">RESERVATION</p>
                                    <p className="mb-0">
                                        <a
                                            href="#"
                                            className="text-white text-break fs-14">
                                            holiday@thelembongantraveller.com
                                        </a>
                                    </p>
                                </div>

                                <div className="vstack gap-1">
                                    <p className="mb-0 fs-16">
                                        VILLA MANAGEMENT
                                    </p>
                                    <p className="mb-0">
                                        <a
                                            href="#"
                                            className="text-white text-break fs-14">
                                            holiday@thelembongantraveller.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-auto">
                            <p className="fs-16">CONNECT WITH US</p>

                            <div className="hstack flex-wrap gap-3">
                                <div className="">
                                    <Image
                                        src={IconIG}
                                        alt="ig the lembongan bali"
                                    />
                                </div>
                                <div className="">
                                    <Image
                                        src={IconFB}
                                        alt="ig the lembongan bali"
                                    />
                                </div>
                                <div className="">
                                    <Image
                                        src={IconYoutube}
                                        alt="ig the lembongan bali"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                <div className="hstack flex-wrap justify-content-between gap-4">
                    <div className="">
                        <p className="fs-14 mb-0">
                            Copyright © 2026 The Lembongan Traveller
                        </p>
                    </div>
                    <div className="">
                        <p className="fs-14 text-lg-end mb-0">
                            Website development by Harmonya Indonesia and TLT
                            Creative | Photography by Salty Wings
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FooterLayout
