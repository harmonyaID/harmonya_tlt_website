'use client'
import { useRef, useEffect } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import IconArrowLeft from '@/component/icon/IconArrowLeft'
import IconArrowRight from '@/component/icon/IconArrowRight'

const ExpSlideImage = ({ list = [] }: { list?: any[] }) => {
    const swiperRef = useRef<SwiperType | null>(null)

    useEffect(() => {
        const swiper = swiperRef.current
        if (swiper && !swiper.destroyed) {
            swiper.loopDestroy?.()
            swiper.loopCreate?.()
            swiper.update()
        }
    }, [list])

    return (
        <div className="w-100 pb-5">
            <div className="w-100 hstack justify-content-end pt-3 pb-4">
                <div className="hstack gap-4">
                    <div
                        role="button"
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                        <IconArrowLeft />
                    </div>

                    <div
                        role="button"
                        onClick={() => swiperRef.current?.slideNext()}
                        className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                        <IconArrowRight />
                    </div>
                </div>
            </div>

            <SwipeSlideBanner
                items={list}
                isNavigation={false}
                swiperConfig={{
                    loop: true,
                }}
                passUseRef={swiperRef}
                breakpoints={{
                    576: { slidesPerView: 2, spaceBetween: 20, loop: true },
                    992: { slidesPerView: 3, spaceBetween: 24, loop: true },
                    1200: {
                        slidesPerView: 2.5,
                        spaceBetween: 24,
                        loopAdditionalSlides: 100,
                        loop: true,
                    },
                }}
                contentElement={(dataElement: any) => {
                    // const dataTags = dataElement.tags || tags || []

                    return (
                        <>
                            <div className="w-100 property-card-slider wp-hover-image">
                                <WrapImageHoverOverlay
                                    className="banner"
                                    // contentOverlay={
                                    //     <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                    //         <BtnBasic className="btn-outline-white rounded-pill">
                                    //             <div className="hstack align-items-center gap-1">
                                    //                 Explore <CodeIconArrow />
                                    //             </div>
                                    //         </BtnBasic>
                                    //     </div>
                                    // }
                                >
                                    <Image
                                        src={imgReelConfig(
                                            dataElement.photo || '',
                                        )}
                                        alt={
                                            dataElement?.nickname ||
                                            'Experience'
                                        }
                                        fill
                                        className="object-fit-cover"
                                    />
                                </WrapImageHoverOverlay>
                            </div>
                        </>
                    )
                }}
            />
        </div>
    )
}

export default ExpSlideImage
