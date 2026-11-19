'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import IconArrowLeft from '@/component/icon/IconArrowLeft'
import IconArrowRight from '@/component/icon/IconArrowRight'

const MAX_RATING = 5

const getRating = (review: any) => {
    const value = Number(
        review?.rating ?? review?.overallRating ?? review?.star ?? MAX_RATING,
    )
    if (Number.isNaN(value)) return MAX_RATING
    // support rating scale 1-10 (e.g. guesty) -> 1-5
    const normalized = value > MAX_RATING ? value / 2 : value
    return Math.max(0, Math.min(MAX_RATING, Math.round(normalized)))
}

// country bisa berupa string atau objek ({ name } / { countryName })
const getCountry = (review: any) => {
    const c = review?.country ?? review?.location
    if (!c) return ''
    if (typeof c === 'string') return c
    return c?.name || c?.countryName || c?.label || ''
}

const ReviewStars = ({ rating = MAX_RATING }: { rating?: number }) => (
    <div className="hstack gap-1 text-primary flex-shrink-0">
        {Array.from({ length: MAX_RATING }).map((_, index) => (
            <span
                key={index}
                className="fs-16 lh-1"
                style={{ opacity: index < rating ? 1 : 0.25 }}>
                ★
            </span>
        ))}
    </div>
)

const PropertyReviewSlider = ({
    reviews = [],
    title = 'Reviews',
}: {
    reviews?: any[]
    title?: string
}) => {
    const swiperRef = useRef<SwiperType | null>(null)

    if (!reviews || reviews.length === 0) return null

    return (
        <div className="w-100">
            <div className="hstack justify-content-between align-items-center gap-3 mb-4">
                <p className="fs-32 text-grey-200 text-uppercase mb-0">
                    {title}
                </p>

                <div className="hstack gap-3">
                    <div
                        role="button"
                        aria-label="Previous review"
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                        <IconArrowLeft />
                    </div>

                    <div
                        role="button"
                        aria-label="Next review"
                        onClick={() => swiperRef.current?.slideNext()}
                        className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                        <IconArrowRight />
                    </div>
                </div>
            </div>

            <Swiper
                className="w-100"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                spaceBetween={16}
                slidesPerView={1.15}
                breakpoints={{
                    576: { slidesPerView: 1.5, spaceBetween: 16 },
                    992: { slidesPerView: 2.2, spaceBetween: 16 },
                }}>
                {reviews.map((review, index) => {
                    const name =
                        review?.guestName ||
                        review?.reviewerName ||
                        review?.name ||
                        'Guest'
                    const country = getCountry(review)
                    const content =
                        review?.content ||
                        review?.comment ||
                        review?.review ||
                        review?.description ||
                        ''

                    return (
                        <SwiperSlide key={review?.id || index} className="h-auto">
                            <div className="h-100 border border-neutral-200 rounded-4 p-4">
                                <div className="hstack justify-content-between align-items-start gap-2">
                                    <p className="fs-20 font-tt-drugs text-grey-200 text-uppercase mb-0">
                                        {name}
                                    </p>
                                    <ReviewStars rating={getRating(review)} />
                                </div>

                                {country ? (
                                    <p className="fs-14 text-primary mb-0 pt-1">
                                        {country}
                                    </p>
                                ) : null}

                                {content ? (
                                    <p className="fs-14 text-grey-400 mb-0 pt-3">
                                        {content}
                                    </p>
                                ) : null}
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default PropertyReviewSlider
