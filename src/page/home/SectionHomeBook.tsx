import Image from 'next/image'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import SlideBannerBackground from '@/asset/image/home/home-book-slide-banner.jpg'
import { PropsSectionContent } from '@/type/sectionContent.type'
import {
    CarouselDefaultWrap,
    CarouselItem,
} from '@/component/general/CarouselDefault'
import RenderHtml from '@/component/general/RenderHtml'

const SectionHomeBook = ({ items = [] }: { items?: any[] }) => {
    return (
        <section className="position-relative">
            <CarouselDefaultWrap className="slide">
                {items?.map((vm, index) => (
                    <CarouselItem
                        key={index}
                        className="position-relative overflow-hidden section-home-carousel-book-banner"
                        isActive={index < 1}>
                        {/*<div className="position-absolute">*/}
                        <Image
                            src={vm.background || SlideBannerBackground}
                            className="position-absolute banner-image"
                            alt={vm.label || ''}
                            fill
                        />
                        {/*</div>*/}

                        <div className="banner-wp-content-text">
                            <div className="container position-relative z-1">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5 text-center text-white">
                                        <div className="vstack gap-4">
                                            <p className="fs-14 mb-0">
                                                {vm.label}
                                            </p>
                                            <div className="">
                                                {/*<h2 className="font-tt-drugs">*/}
                                                {/*    BOOK IN ADVANCE*/}
                                                {/*</h2>*/}
                                                {/*<p className="fs-14">*/}
                                                {/*    Book ahead and secure your stay*/}
                                                {/*    for 2026 island escape and get a*/}
                                                {/*    special rate.*/}
                                                {/*</p>*/}
                                                <RenderHtml html={vm.content} />
                                            </div>

                                            <div className="">
                                                <BtnLinkPrimary
                                                    className="rounded-pill"
                                                    href={vm.buttonLink}>
                                                    {vm.buttonText}
                                                </BtnLinkPrimary>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselDefaultWrap>
        </section>
    )
}

export default SectionHomeBook
