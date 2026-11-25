'use client'
import { useCallback, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import IconArrowLeft from '@/component/icon/IconArrowLeft'
import IconArrowRight from '@/component/icon/IconArrowRight'
import { isEmpty } from 'lodash'
import ValidImage from '@/component/general/ValidImage'
import PropertyGalleryModal, {
    GalleryPhoto,
} from '@/page/property/component/PropertyGalleryModal'

const PropertySliderAndGallery = ({
    photos = [],
    title = '',
}: {
    photos?: GalleryPhoto[]
    title?: string
}) => {
    const swiperRef = useRef<SwiperType | null>(null)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    const _closeGallery = useCallback(() => setIsGalleryOpen(false), [])

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
        <>
            <div className="property-slider position-relative w-100 overflow-hidden">
                <Swiper
                    className="w-100"
                    modules={[Pagination]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    loop={sortedPhotos.length > 2}
                    spaceBetween={12}
                    slidesPerView={1.1}
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
                    {sortedPhotos.map((item, index) => (
                        <SwiperSlide key={item.id ?? index}>
                            <div
                                className="property-slider-img"
                                role="button"
                                onClick={() => setIsGalleryOpen(true)}>
                                <ValidImage
                                    src={item.url}
                                    alt={item.caption || title || 'photos'}
                                    className="object-fit-cover"
                                    sizes="85vw"
                                    priority={index === 0}
                                    fill
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {sortedPhotos.length > 1 ? (
                    <>
                        <button
                            type="button"
                            className="property-slider-arrow is-prev"
                            aria-label="Previous photo"
                            onClick={() => swiperRef.current?.slidePrev()}>
                            <IconArrowLeft />
                        </button>
                        <button
                            type="button"
                            className="property-slider-arrow is-next"
                            aria-label="Next photo"
                            onClick={() => swiperRef.current?.slideNext()}>
                            <IconArrowRight />
                        </button>
                    </>
                ) : null}

                <button
                    type="button"
                    className="property-slider-view-all"
                    onClick={() => setIsGalleryOpen(true)}>
                    View All {sortedPhotos.length} Photos
                </button>
            </div>

            <PropertyGalleryModal
                isOpen={isGalleryOpen}
                onClose={_closeGallery}
                photos={sortedPhotos}
                title={title}
            />
        </>
    )
}

export default PropertySliderAndGallery
