import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import BGHero from '@/asset/image/propertyManagement/hero-bg-property-management.jpg'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import Breadcrumb from '@/component/general/Breadcrumb'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import { BtnLinkPrimary } from '@/component/general/Button'
import HorizontalTitleAndDesc from '@/component/general/HorizontalTitleAndDesc'

const PropertyManagementMain = ({ content = {} }: { content?: any }) => {
    const { SECTION1, SECTION2, SECTION3, SECTION4, SECTION5, SECTION6 } =
        content

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1?.title || '',
                    image: SECTION1?.backgroundImage || '',
                }}
            />

            <section className="pt-4">
                <div className="container">
                    <div className="">
                        <Breadcrumb isLabelHome />
                    </div>
                </div>
            </section>

            <section className="pt-4 section-space-small-bottom">
                <div className="container">
                    <div className="row align-items-center gx-8 gy-4 mb-5 pb-4">
                        <div className="col-md-6">
                            <WrapImageHoverOverlay className="h-480-px">
                                <Image
                                    src={imgLandscapeConfig(
                                        SECTION2[0].backgroundImage,
                                    )}
                                    alt={
                                        SECTION2[0].title ||
                                        'Adventure Awaits Beneath the Surface'
                                    }
                                    fill
                                    className="object-fit-cover w-100"
                                    // className="object-cover"
                                />
                            </WrapImageHoverOverlay>
                        </div>

                        <div className="col-md-6">
                            <div className="vstack mb-3">
                                <h5 className="fs-48 fw-light font-tt-drugs text-uppercase mb-0 text-grey-200">
                                    {SECTION2[0].title}
                                </h5>

                                <p className="fs-24 fw-300 text-grey-400 text-uppercase  mb-0">
                                    {SECTION2[0].excerpt}
                                </p>
                            </div>

                            <p className="fs-16 text-grey-400">
                                {SECTION2[0].description}
                            </p>

                            <div className="pt-4">
                                <BtnLinkPrimary
                                    isIconArrow
                                    className="rounded-pill"
                                    href={SECTION2[0].buttonLink}>
                                    {SECTION2[0].buttonText}
                                </BtnLinkPrimary>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center gx-5 gy-4">
                        <div className="col-md-5">
                            <div className="vstack mb-3">
                                <h5 className="fs-48 fw-light font-tt-drugs text-uppercase mb-0 text-grey-200">
                                    {SECTION2[1].title}
                                </h5>

                                {SECTION2[1].excerpt ? (
                                    <p className="fs-24 fw-300 text-grey-400 text-uppercase  mb-0">
                                        {SECTION2[1].excerpt}
                                    </p>
                                ) : null}
                            </div>

                            <p className="fs-16 text-grey-400">
                                {SECTION2[1].description}
                            </p>
                        </div>

                        <div className="col-md-7">
                            <WrapImageHoverOverlay className="h-480-px">
                                <Image
                                    src={imgLandscapeConfig(
                                        SECTION2[1].backgroundImage,
                                    )}
                                    alt={
                                        SECTION2[1].title ||
                                        'Adventure Awaits Beneath the Surface'
                                    }
                                    fill
                                    className="object-fit-cover w-100"
                                    // className="object-cover"
                                />
                            </WrapImageHoverOverlay>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <h5 className="fs-40 fw-light font-tt-drugs text-uppercase mb-5 text-grey-200 text-center">
                        {SECTION3.title}
                    </h5>

                    <div className="row gx-5 gy-4 mt-4">
                        {SECTION3?.points?.map((vm, index) => {
                            return (
                                <div key={index} className="col-md-4">
                                    <div className="vstack gap-3 align-items-center">
                                        <div className="box-80 position-relative">
                                            <Image
                                                src={imgLandscapeConfig(
                                                    vm.icon,
                                                )}
                                                fill
                                                className="object-fit-cover w-100"
                                                alt={vm.title}
                                            />
                                        </div>

                                        <div className="text-center">
                                            <p className="fs-20 fw-light font-tt-drugs text-uppercase text-grey-200">
                                                {vm.title}
                                            </p>
                                            <p className="fs-16 fw-light text-grey-400">
                                                {vm.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <HorizontalTitleAndDesc
                        title={SECTION4.title}
                        excerpt={SECTION4.excerpt}
                        description={SECTION4.description}
                    />

                    <div className="row gx-5 pt-5">
                        {SECTION4.points.map((vm, index) => {
                            return (
                                <div key={index} className="col-md-4">
                                    <div className="h-320-px position-relative mb-4">
                                        <Image
                                            src={imgLandscapeConfig(
                                                vm.backgroundImage,
                                            )}
                                            fill
                                            className="object-fit-cover w-100"
                                            alt={vm.title}
                                        />
                                    </div>

                                    <p className="fs-32 font-tt-drugs text-uppercase text-grey-200">
                                        {vm.title}
                                    </p>
                                    <p className="fs-20 text-grey-400">
                                        {vm.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-primary">
                <div className="container">
                    <HorizontalTitleAndDesc
                        title={SECTION5.title}
                        excerpt={SECTION5.excerpt}
                        description={SECTION5.description}
                        isTextWhite
                    />

                    <div className="row justify-content-center gx-5 gy-4 section-space-small-top">
                        {SECTION5.points.map((vm, index) => {
                            return (
                                <div key={index} className="col-md-3">
                                    <div className="vstack gap-3 align-items-center">
                                        <div className="box-80 position-relative mb-4">
                                            <Image
                                                src={imgLandscapeConfig(
                                                    vm.icon,
                                                )}
                                                fill
                                                className="object-fit-cover w-100"
                                                alt={vm.title}
                                            />
                                        </div>

                                        <div className="text-center text-white">
                                            <p className="fs-20 fw-300 font-tt-drugs text-uppercase">
                                                {vm.title}
                                            </p>
                                            <p className="fs-16 fw-300">
                                                {vm.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <h5 className="font-tt-drugs text-uppercase fs-40 text-center text-grey-200">
                        {SECTION6.title}
                    </h5>
                </div>
            </section>

            <FooterLayout />
        </>
    )
}

export default PropertyManagementMain
