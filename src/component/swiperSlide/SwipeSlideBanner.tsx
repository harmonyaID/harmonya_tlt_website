'use client'
import { ReactNode, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import IconArrowLeft from '@/component/icon/IconArrowLeft'
import IconArrowRight from '@/component/icon/IconArrowRight'

const SwipeSlideBanner = ({
    items = [],
    contentElement,
    breakpoints = {
        576: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 24 },
    },
    isNavigation = true,
    passUseRef = '',
    swiperConfig = {},
    className = '',
}: {
    items?: any[]
    contentElement?: any
    breakpoints?: {} | any
    isNavigation?: boolean
    passUseRef?: any
    swiperConfig?: any
    className?: string
}) => {
    const swiperRef = passUseRef || useRef<SwiperType | null>(null)

    return (
        <div className="d-flex justify-content-between align-items-center w-100 gap-4">
            {isNavigation ? (
                <div className="">
                    <div
                        role="button"
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                        <IconArrowLeft />
                    </div>
                </div>
            ) : null}

            <Swiper
                className={className}
                modules={[Navigation]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                spaceBetween={24}
                slidesPerView={1.15}
                breakpoints={breakpoints}
                {...swiperConfig}>
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        {contentElement(item)}
                    </SwiperSlide>
                ))}
            </Swiper>

            {isNavigation ? (
                <div className="">
                    <div
                        role="button"
                        onClick={() => swiperRef.current?.slideNext()}
                        className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                        <IconArrowRight />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default SwipeSlideBanner
