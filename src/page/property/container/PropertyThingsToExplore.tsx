'use client'
import useExpAreaListHook from '@/page/experience/hook/useExpAreaList.hook'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import IconPropertyBad from '@/component/icon/IconPropertyBad'
import Link from 'next/link'
import canonicalURLHelper from '@/helper/canonicalURL.helper'
import { countTotalBeds } from '@/helper/count.helper'
import IconPropertyGuest from '@/component/icon/IconPropertyGuest'
import PropertyAmities from '@/page/property/component/PropertyAmities'
import IconPropertyEat from '@/component/icon/IconPropertyEat'
import IconPropertyPool from '@/component/icon/IconPropertyPool'
import { BadgeTag } from '@/component/general/Badge'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import RenderHtml from '@/component/general/RenderHtml'

const PropertyThingsToExplore = () => {
    const swiperRef = useRef<SwiperType | null>(null)

    const { list, isLoading, pagination, _handleChangePage } =
        useExpAreaListHook({
            configSearch: {
                // search: 'play',
                typeId: 2,
            },
        })

    console.log('list: ', list)

    return (
        <>
            {list && list.length > 0 ? (
                <section className="section-space-small bg-neutral-100">
                    <div className="container">
                        <div className="row gy-3 mb-4">
                            <div className="col-md-6">
                                <p className="fs-40 text-grey-200 font-tt-drugs fs-48 fw-400 mb-0">
                                    THINGS TO EXPLORE
                                </p>
                            </div>
                        </div>

                        <SwipeSlideBanner
                            items={list.filter(
                                (vm) => vm?.type?.name === 'Play',
                            )}
                            isNavigation={false}
                            swiperConfig={{
                                loop: true,
                            }}
                            passUseRef={swiperRef}
                            breakpoints={{
                                576: { slidesPerView: 2, spaceBetween: 20 },
                                992: { slidesPerView: 3, spaceBetween: 24 },
                                1200: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 24,
                                    loopAdditionalSlides: 100,
                                },
                            }}
                            contentElement={(dataElement: any) => {
                                const { seo = {} } = dataElement

                                return (
                                    <>
                                        <Link
                                            className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden property-card-slider"
                                            href={canonicalURLHelper(
                                                seo?.canonicalUrl,
                                            )}>
                                            <WrapImageHoverOverlay
                                                className="banner"
                                                contentOverlay={
                                                    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                                        <BtnBasic className="btn-outline-white rounded-pill">
                                                            <div className="hstack align-items-center gap-1">
                                                                Explore{' '}
                                                                <CodeIconArrow />
                                                            </div>
                                                        </BtnBasic>
                                                    </div>
                                                }>
                                                <Image
                                                    src={imgReelConfig(
                                                        dataElement?.banner,
                                                    )}
                                                    alt={
                                                        dataElement.name ||
                                                        'Area Play'
                                                    }
                                                    fill
                                                    className="object-fit-cover"
                                                />
                                            </WrapImageHoverOverlay>

                                            <div className="">
                                                <div className="hstack gap-3 flex-wrap mb-3 text-grey-200">
                                                    <p className="fs-20 mb-0 font-tt-drugs">
                                                        {dataElement.name}
                                                    </p>

                                                    {/*<p className="fs-14 mb-0">*/}
                                                    {/*    {*/}
                                                    {/*        dataElement.description*/}
                                                    {/*    }*/}
                                                    {/*</p>*/}
                                                    <RenderHtml
                                                        html={
                                                            dataElement.description
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )
                            }}
                        />

                        {/*{!isLoading ? (*/}
                        {/*    <div className="row pt-5 pb-4">*/}
                        {/*        {list*/}
                        {/*            ?.filter((vm) => vm?.type?.id === 2)*/}
                        {/*            .map((vm, index) => {*/}
                        {/*                return (*/}
                        {/*                    <div*/}
                        {/*                        className="col-md-4 col-lg-3"*/}
                        {/*                        key={index}>*/}
                        {/*                        <WrapImageHoverOverlay*/}
                        {/*                            className="section-blog-banner-reel"*/}
                        {/*                            contentOverlay={*/}
                        {/*                                <div className="h-100 w-100 d-flex justify-content-center align-items-center">*/}
                        {/*                                    <BtnBasic className="btn-outline-white rounded-pill">*/}
                        {/*                                        <div className="hstack align-items-center gap-1">*/}
                        {/*                                            Explore{' '}*/}
                        {/*                                            <CodeIconArrow />*/}
                        {/*                                        </div>*/}
                        {/*                                    </BtnBasic>*/}
                        {/*                                </div>*/}
                        {/*                            }>*/}
                        {/*                            <Image*/}
                        {/*                                src={imgReelConfig(*/}
                        {/*                                    vm?.banner,*/}
                        {/*                                )}*/}
                        {/*                                alt={*/}
                        {/*                                    vm.name ||*/}
                        {/*                                    'Area Paly'*/}
                        {/*                                }*/}
                        {/*                                fill*/}
                        {/*                                className="object-fit-cover"*/}
                        {/*                            />*/}
                        {/*                        </WrapImageHoverOverlay>*/}

                        {/*                        <div className="pt-3">*/}
                        {/*                            <p className="font-tt-drugs mb-0 fs-32 text-white text-center fw-light">*/}
                        {/*                                {vm.name}*/}
                        {/*                            </p>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                )*/}
                        {/*            })}*/}
                        {/*    </div>*/}
                        {/*) : null}*/}
                    </div>
                </section>
            ) : null}
        </>
    )
}

export default PropertyThingsToExplore
