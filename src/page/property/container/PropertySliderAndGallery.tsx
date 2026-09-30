'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import IconArrowLeft from '@/component/icon/IconArrowLeft'
import IconArrowRight from '@/component/icon/IconArrowRight'
import { isEmpty } from 'lodash'
import joinClassNameHelper from '@/helper/joinClassName.helper'

type Photo = {
    id: number
    url: string
    caption?: string
    order?: number
}

const PropertySliderAndGallery = ({ photos = [] }: { photos?: Photo[] }) => {
    const swiperRef = useRef<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    if (isEmpty(photos)) return null

    // urutkan berdasarkan field "order"
    const sortedPhotos = [...photos].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
    )

    const breakpoints = {
        576: { slidesPerView: 1.2, spaceBetween: 20 },
        992: { slidesPerView: 1.2, spaceBetween: 24 },
        1200: { slidesPerView: 1.2, spaceBetween: 24 },
    }

    return (
        <div className="relative w-full overflow-hidden">
            <Swiper
                className="w-100"
                modules={[Navigation, Pagination]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                loop
                spaceBetween={24}
                slidesPerView={1.15}
                centeredSlides
                breakpoints={breakpoints}
                pagination={{ clickable: true, dynamicBullets: true }}
                style={
                    {
                        '--swiper-pagination-color': '#fff',
                        '--swiper-pagination-bullet-inactive-color': '#fff',
                        '--swiper-pagination-bullet-inactive-opacity': 0.6,
                        '--swiper-pagination-bullet-size': '8px',
                        '--swiper-pagination-bottom': '16px',
                    } as React.CSSProperties
                }>
                {photos && !isEmpty(photos)
                    ? photos?.map((item, index) => (
                          <SwiperSlide key={index}>
                              <div className="w-100" style={{ height: '70vh' }}>
                                  <Image
                                      src={item.url}
                                      alt="photos"
                                      className="object-fit-cover"
                                      fill
                                  />
                              </div>
                          </SwiperSlide>
                      ))
                    : null}
            </Swiper>
        </div>
    )
}

export default PropertySliderAndGallery
