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
import BoatTransferPriceTable from '@/page/boatTransfer/component/BoatTransferPriceTable'
import BoatTransferBookingModal from '@/page/boatTransfer/component/BoatTransferBookingModal'
import actionModal from '@/helper/base/actionModal.helper'
import { MDBoatTransferBooking } from '@/config/modal.config'

const customInfo = [
    {
        name: 'Lorem',
        info: [
            {
                name: 'Wow',
                value: 'Heh',
            },
            {
                name: 'Satu',
                value: 'Satu',
            },
        ],
    },
    {
        name: 'Sun',
        info: [
            {
                name: 'Go',
                value: 'Kong',
            },
            {
                name: 'Wikuhasd',
                value: 'KWLJnlsdds',
            },
        ],
    },
]

const BoatTransferDetail = ({ detail }: { detail: any }) => {
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

                    <div className="hstack gap-4 mb-5">
                        <div className="border rounded-3 px-5 py-2">
                            <div className="vstack gap-2">
                                <p className="m-0 fw-semibold">
                                    Sanur → Jungutbatu Main Bay
                                </p>
                                <p className="m-0">9.15 AM, 1 PM, 5 PM</p>
                            </div>
                        </div>
                        <div className="border rounded-3 px-5 py-2">
                            <div className="vstack gap-2">
                                <p className="m-0 fw-semibold">
                                    Sanur → Jungutbatu Main Bay
                                </p>
                                <p className="m-0">9.15 AM, 1 PM, 5 PM</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p>
                            D’Stars Fast Ferry offers a comfortable,
                            air-conditioned ride to Nusa Lembongan, with WiFi on
                            board to keep you connected along the way.
                        </p>
                        <p>
                            The Lembongan Traveller use D’Stars Fast Ferry for
                            our guest boat transfers from Sanur, Bali to the
                            main bay of Jungutbatu in Nusa Lembongan. Nusa
                            Lembongan is only 30 minutes from Bali, making it an
                            easy day trip destination and very accessible for
                            those wishing to stay longer and explore Nusa
                            Lembongan and neighbouring islands: Nusa Ceningan
                            and Nusa Penida. Boat transfer tickets include all
                            luggage as part of the ticketing price.
                        </p>
                        <p>...</p>

                        <p className="text-primary text-decoration-underline">
                            Read More
                        </p>

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

                    <div className="boat-transfer-banner-sm">
                        <Image
                            src={BGHero}
                            alt="about home"
                            fill
                            priority
                            className="object-fit-cover"
                        />

                        <div className="px-50 position-relative d-flex flex-column justify-content-center align-items-end h-100 text-white">
                            <div>
                                <div className="vstack gap-1">
                                    <div className="discount hstack align-items-end  font-tt-drugs">
                                        <h1 className="mb-0 p-0">20</h1>
                                        <div className="vstack justify-content-end">
                                            <h4 className="mb-0 p-0 fw-bold">
                                                % OFF
                                            </h4>
                                            <p className="mb-0 p-0">
                                                BOAT TRANSFER
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white bookings text-uppercase text-black px-3 py-2  font-tt-drugs">
                                        With accommodation bookings
                                    </div>

                                    <p className="mb-0 text-center exclude">
                                        *exclude private boat transfers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-70">
                        <div className="col-md-6">
                            <BoatTransferPriceTable />
                        </div>
                        <div className="col-md-6">
                            <BoatTransferPriceTable />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small font-tt-drugs">
                <div className="container">
                    <SectionTitle className=" text-uppercase fs-32 fw-light mb-5">
                        Ferry Route
                    </SectionTitle>

                    <div
                        style={{
                            maxHeight: '682px',
                            width: '100%',
                            overflow: 'clip',
                            position: 'relative',
                        }}>
                        <Image
                            src={BGHero}
                            alt="about home"
                            className="object-fit-cover"
                        />
                    </div>
                </div>
                <div className="container-fluid mt-70 px-5">
                    <SwipeSlideBanner
                        items={[
                            {
                                buttonLink: '#',
                                image: BGHero,
                                title: 'Test',
                            },
                            {
                                buttonLink: '#',
                                image: BGHero,
                                title: 'Test',
                            },
                            {
                                buttonLink: '#',
                                image: BGHero,
                                title: 'Test',
                            },
                        ]}
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
                                <Link
                                    className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                    href={dataElement.buttonLink || '#'}>
                                    <WrapImageHoverOverlay
                                        className="section-boat-banner-reel"
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
                                            src={dataElement?.image}
                                            alt={dataElement.title}
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </WrapImageHoverOverlay>
                                </Link>
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
