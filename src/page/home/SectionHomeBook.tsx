'use client'

import Image from 'next/image'
import { BtnLinkPrimary } from '@/component/general/Button'
import {
    CarouselDefaultWrap,
    CarouselItem,
} from '@/component/general/CarouselDefault'
import RenderHtml from '@/component/general/RenderHtml'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import ValidImage from '@/component/general/ValidImage'

const SectionHomeBook = ({
    items = [],
    list = [],
}: {
    items?: any[]
    list?: any[]
}) => {
    return (
        <section className="position-relative">
            <CarouselDefaultWrap className="slide">
                {list?.map((vm, index) => {
                    const { seo } = vm

                    return (
                        <CarouselItem
                            key={index}
                            className="position-relative overflow-hidden section-home-carousel-book-banner"
                            isActive={index < 1}>
                            {/*<div className="position-absolute">*/}
                            <ValidImage
                                src={vm?.thumbnail}
                                className="position-absolute banner-image"
                                alt={vm.title || ''}
                                fill
                            />
                            {/*</div>*/}

                            <div className="banner-wp-content-text">
                                <div className="container position-relative z-1">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-5 text-center text-white">
                                            <div className="vstack gap-5">
                                                <p className="fs-20 font-tt-drugs mb-0">
                                                    {vm.title}
                                                </p>
                                                <div className="">
                                                    <RenderHtml
                                                        className="fw-light"
                                                        html={vm.excerpt}
                                                    />
                                                </div>

                                                <div className="">
                                                    <BtnLinkPrimary
                                                        className="rounded-pill"
                                                        isIconArrow
                                                        href={
                                                            seo?.canonicalUrl ||
                                                            '#'
                                                        }>
                                                        BOOK NOW
                                                    </BtnLinkPrimary>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselDefaultWrap>
        </section>
    )
}

export default SectionHomeBook
