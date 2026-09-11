import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import {
    BtnLinkBasic,
    BtnLinkPrimary,
    BtnPrimary,
} from '@/component/general/Button'
import { EXPERIENCE_PATH, HOME_PATH, STAY_PATH } from '@/config/pagePath.config'
import Image from 'next/image'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import BGHero404 from '@/asset/image/default/bg-404-default.jpg'

const NotFoundPage = () => {
    return (
        <>
            {/*<NavbarLayout />*/}
            {/*<section className="section-space bg-white">*/}
            {/*    <div className="container pt-5 mt-5 text-center">*/}
            {/*        <h1 className="font-tt-drugs">404 - Page Not Found</h1>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<FooterNewsLatterStaticLayout />*/}
            {/*<FooterLayout />*/}

            <TemplatePageBaseLayout isBgTransparent isSecondFooter={false}>
                <section className="section-hero-min-half-screen bg-green-500 ">
                    <div className="general-hero-full-screen">
                        <Image
                            src={imgLandscapeConfig(BGHero404)}
                            className="h-100 banner-image"
                            alt={
                                'The Lembongan Traveller - Your Guide to Nusa Lembongan'
                            }
                            fill
                        />
                    </div>

                    <div className="top-0 position-absolute w-100 h-100 z-1 text-center">
                        <div className="vstack w-100 h-100 justify-content-center align-items-center">
                            <div className="py-5">
                                <h1 className="font-tt-drugs  text-white">
                                    Error 404
                                </h1>
                                <p className="fs-16 text-white">
                                    We can’t seem to find the page you’re
                                    looking for
                                </p>

                                <div className="hstack gap-3 justify-content-center pt-4">
                                    <BtnLinkPrimary
                                        href={HOME_PATH}
                                        className="rounded-pill">
                                        BACK TO HOMEPAGE
                                    </BtnLinkPrimary>

                                    <BtnLinkBasic
                                        href={EXPERIENCE_PATH}
                                        className="btn-outline-white rounded-pill">
                                        DISCOVER EXPERIENCE
                                    </BtnLinkBasic>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </TemplatePageBaseLayout>
        </>
    )
}

export default NotFoundPage
