'use client'

import Breadcrumb from '@/component/general/Breadcrumb'
import { SectionTitle } from '@/component/text/Heading'
import {
    BtnBasic,
    BtnLinkPrimary,
    BtnPrimary,
    CodeIconArrow,
} from '@/component/general/Button'
import Image from 'next/image'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { imgReelConfig } from '@/config/urlImage.config'
import BoatTransferCard from '@/page/boatTransfer/component/BoatTransferCard'
import BoatTransferCustomInfo from '@/page/boatTransfer/component/BoatTransferCustomInfo'
import BoatTransferBookingModal from '@/page/boatTransfer/component/BoatTransferBookingModal'
import actionModal from '@/helper/base/actionModal.helper'
import { MDBoatTransferBooking } from '@/config/modal.config'
import RenderHtml from '@/component/general/RenderHtml'
import TextReadMore from '@/component/general/TextReadMore'
import { useMemo } from 'react'

const BoatTransferDetail = ({ detail }: { detail: any }) => {
    const photos = useMemo(() => {
        return detail?.photos
            ?.sort((a, b) => a.order - b.order)
            .map((photo) => ({
                image: photo?.photo,
                title: 'Photo ' + photo.order,
            }))
    }, [detail])

    console.log(detail)
    return (
        <>
            <div className="container-fluid px-5 py-3 font-tt-drugs fs-16 fw-light">
                <Breadcrumb />
            </div>
            <section className="section-space-small font-tt-drugs boat-transfer-color">
                <div className="container">
                    <SectionTitle className=" text-uppercase fs-32 fw-light mb-5">
                        About The Boat
                    </SectionTitle>

                    {detail?.schedule && (
                        <div className="hstack gap-4 mb-5">
                            {detail?.schedule?.map((vm, index) => (
                                <div
                                    className="border rounded-3 px-5 py-2"
                                    key={index}>
                                    <div className="vstack gap-2">
                                        <p className="m-0 fw-semibold">
                                            {vm.from} → {vm.to}
                                        </p>
                                        <p className="m-0">
                                            {vm.times?.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <TextReadMore classNameButton="mt-3">
                            <RenderHtml html={detail?.description} />
                        </TextReadMore>

                        <div className="hstack gap-2 mt-4 width-fit-content">
                            <BtnLinkPrimary
                                href="/boat-transfers/test-slug"
                                isOutline
                                className="rounded-pill fs-14 w-100 text-nowrap px-5">
                                MORE DETAILS
                            </BtnLinkPrimary>
                            <BtnPrimary
                                handle={() =>
                                    actionModal(MDBoatTransferBooking)
                                }
                                className="rounded-pill text-white fs-14 w-100 text-nowrap px-5">
                                BOOK NOW
                            </BtnPrimary>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" font-tt-drugs">
                <div className="container">
                    <SectionTitle className=" text-uppercase fs-32 fw-light mb-5">
                        Price
                    </SectionTitle>

                    {detail?.promoPhotos && (
                        <div className="boat-transfer-banner-sm">
                            <Image
                                src={detail?.promoPhotos?.[0]?.file || ''}
                                alt="about home"
                                fill
                                priority
                                className="object-fit-cover"
                            />

                            {/*<div className="px-50 position-relative d-flex flex-column justify-content-center align-items-end h-100 text-white">*/}
                            {/*    <div>*/}
                            {/*        <div className="vstack gap-1">*/}
                            {/*            <div className="discount hstack align-items-end  font-tt-drugs">*/}
                            {/*                <h1 className="mb-0 p-0">20</h1>*/}
                            {/*                <div className="vstack justify-content-end">*/}
                            {/*                    <h4 className="mb-0 p-0 fw-bold">*/}
                            {/*                        % OFF*/}
                            {/*                    </h4>*/}
                            {/*                    <p className="mb-0 p-0">*/}
                            {/*                        BOAT TRANSFER*/}
                            {/*                    </p>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}

                            {/*            <div className="bg-white bookings text-uppercase text-black px-3 py-2  font-tt-drugs">*/}
                            {/*                With accommodation bookings*/}
                            {/*            </div>*/}

                            {/*            <p className="mb-0 text-center exclude">*/}
                            {/*                *exclude private boat transfers*/}
                            {/*            </p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    )}

                    {detail?.customInformations && (
                        <div className="row mt-70">
                            {detail?.customInformations?.map((info, index) => (
                                <div className="col-md-6" key={index}>
                                    <BoatTransferCustomInfo info={info} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section-space-small font-tt-drugs">
                {detail?.mapImage && (
                    <div className="container">
                        <SectionTitle className=" text-uppercase fs-32 fw-light mb-5">
                            Ferry Route
                        </SectionTitle>

                        <div
                            style={{
                                height: '682px',
                                width: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                            <Image
                                src={detail?.mapImage || ''}
                                alt="about home"
                                fill
                                className="object-fit-cover"
                            />
                        </div>
                    </div>
                )}

                <div className="container-fluid mt-70 px-5">
                    <SwipeSlideBanner
                        items={photos}
                        breakpoints={{
                            576: { slidesPerView: 2, spaceBetween: 20 },
                            992: { slidesPerView: 3, spaceBetween: 24 },
                            1200: { slidesPerView: 2.5, spaceBetween: 24 },
                        }}
                        swiperConfig={{
                            loop: true,
                        }}
                        contentElement={(dataElement: any) => (
                            <>
                                <div className="w-100 vstack gap-3 text-grey-200 wp-hover-image">
                                    <WrapImageHoverOverlay className="section-boat-banner-reel">
                                        <Image
                                            src={dataElement?.image}
                                            alt={dataElement.title}
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </WrapImageHoverOverlay>
                                </div>
                            </>
                        )}
                    />
                </div>
            </section>

            <section className="section-space-small bg-neutral-100 font-tt-drugs">
                <div className="container">
                    <SectionTitle className="text-center text-uppercase fs-32 fw-light mb-5">
                        Discover other boats
                    </SectionTitle>

                    <div className="mt-70">
                        <div className="row boat-transfer-card-g ">
                            <div className="col-md-4 col-12">
                                <BoatTransferCard isSimple boat={null} />
                            </div>
                            <div className="col-md-4 col-12">
                                <BoatTransferCard isSimple boat={null} />
                            </div>
                            <div className="col-md-4 col-12">
                                <BoatTransferCard isSimple boat={null} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BoatTransferBookingModal />
        </>
    )
}

export default BoatTransferDetail
