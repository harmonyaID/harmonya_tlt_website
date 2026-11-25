'use client'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Keyboard } from 'swiper/modules'
import { X } from 'feather-icons-react'
import 'swiper/css'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout'
import ValidImage from '@/component/general/ValidImage'
import IconArrowLeft from '@/component/icon/IconArrowLeft'
import IconArrowRight from '@/component/icon/IconArrowRight'
import joinClassNameHelper from '@/helper/joinClassName.helper'

export type GalleryPhoto = {
    id: number
    url: string
    caption?: string
    order?: number
}

// pola grid: 1 foto besar, lalu 2 foto berdampingan, berulang
const isWidePhoto = (index: number) => index % 3 === 0

const PropertyGalleryModal = ({
    isOpen,
    onClose,
    photos = [],
    title = '',
}: {
    isOpen: boolean
    onClose: () => void
    photos?: GalleryPhoto[]
    title?: string
}) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const lightboxRef = useRef<SwiperType | null>(null)
    const isLightboxOpen = lightboxIndex !== null

    const _openLightbox = (index: number) => {
        setLightboxIndex(index)
        setCurrentIndex(index)
    }

    const _closeAll = () => {
        setLightboxIndex(null)
        onClose()
    }

    // kunci scroll body + tombol Escape
    useEffect(() => {
        if (!isOpen) return

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return
            // tutup lightbox dulu, baru modal gallery
            if (isLightboxOpen) setLightboxIndex(null)
            else onClose()
        }

        window.addEventListener('keydown', handleKey)
        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener('keydown', handleKey)
        }
    }, [isOpen, isLightboxOpen, onClose])

    return (
        <CreatePortalLayout>
            <div
                className={joinClassNameHelper('property-gallery-modal', {
                    show: isOpen,
                })}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isOpen}>
                {/* Header */}
                <div className="property-gallery-header">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between gap-3 py-3">
                            <div>
                                <p className="fs-24 font-tt-drugs text-uppercase text-grey-200 mb-0">
                                    {title || 'Gallery'}
                                </p>
                                <p className="fs-14 text-grey-500 mb-0">
                                    {photos.length} Photos
                                </p>
                            </div>
                            <button
                                type="button"
                                className="property-gallery-close"
                                aria-label="Close gallery"
                                onClick={_closeAll}>
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="property-gallery-body">
                    <div className="container">
                        <div className="property-gallery-grid">
                            {isOpen
                                ? photos.map((photo, index) => (
                                      <button
                                          type="button"
                                          key={photo.id ?? index}
                                          className={joinClassNameHelper(
                                              'property-gallery-item',
                                              { 'is-wide': isWidePhoto(index) },
                                          )}
                                          onClick={() => _openLightbox(index)}>
                                          <ValidImage
                                              src={photo.url}
                                              alt={
                                                  photo.caption ||
                                                  `${title} photo ${index + 1}`
                                              }
                                              fill
                                              sizes={
                                                  isWidePhoto(index)
                                                      ? '(max-width: 992px) 100vw, 960px'
                                                      : '(max-width: 576px) 100vw, 480px'
                                              }
                                              className="object-fit-cover"
                                          />
                                      </button>
                                  ))
                                : null}
                        </div>
                    </div>
                </div>

                {/* Lightbox */}
                {isLightboxOpen ? (
                    <div className="property-gallery-lightbox">
                        <div className="property-gallery-lightbox-top">
                            <p className="fs-14 text-white mb-0">
                                {currentIndex + 1} / {photos.length}
                            </p>
                            <button
                                type="button"
                                className="property-gallery-close is-dark"
                                aria-label="Close photo"
                                onClick={() => setLightboxIndex(null)}>
                                <X size={24} />
                            </button>
                        </div>

                        <Swiper
                            className="property-gallery-lightbox-swiper"
                            modules={[Keyboard]}
                            keyboard={{ enabled: true }}
                            initialSlide={lightboxIndex}
                            spaceBetween={24}
                            onSwiper={(swiper) => {
                                lightboxRef.current = swiper
                            }}
                            onSlideChange={(swiper) =>
                                setCurrentIndex(swiper.activeIndex)
                            }>
                            {photos.map((photo, index) => (
                                <SwiperSlide key={photo.id ?? index}>
                                    <div className="property-gallery-lightbox-img">
                                        <ValidImage
                                            src={photo.url}
                                            alt={
                                                photo.caption ||
                                                `${title} photo ${index + 1}`
                                            }
                                            fill
                                            sizes="100vw"
                                            className="object-fit-contain"
                                        />
                                    </div>
                                    {photo.caption ? (
                                        <p className="fs-14 text-white text-center mt-3 mb-0">
                                            {photo.caption}
                                        </p>
                                    ) : null}
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            type="button"
                            className="property-gallery-arrow is-prev"
                            aria-label="Previous photo"
                            disabled={currentIndex === 0}
                            onClick={() => lightboxRef.current?.slidePrev()}>
                            <IconArrowLeft />
                        </button>
                        <button
                            type="button"
                            className="property-gallery-arrow is-next"
                            aria-label="Next photo"
                            disabled={currentIndex === photos.length - 1}
                            onClick={() => lightboxRef.current?.slideNext()}>
                            <IconArrowRight />
                        </button>
                    </div>
                ) : null}
            </div>
        </CreatePortalLayout>
    )
}

export default PropertyGalleryModal
