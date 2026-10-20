'use client'

import { SectionTitle } from '@/component/text/Heading'
import Image from 'next/image'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import BoatTransferCard from '@/page/boatTransfer/component/BoatTransferCard'
import BoatTransferBookingModal from '@/page/boatTransfer/component/BoatTransferBookingModal'
import actionModal from '@/helper/base/actionModal.helper'
import { MDBoatTransferBooking } from '@/config/modal.config'

const BoatTransferMain = () => {
    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="row mb-90">
                        <div className="col-md-7">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                                Cross Over to Island Life
                            </SectionTitle>
                        </div>

                        <div className="col-md-4 offset-1">
                            <p className="font-tt-drugs">
                                Getting to Nusa Lembongan is easy, just hop on a
                                fast boat from Bali and let the island adventure
                                begin. Enjoy 20% off selected boat transfers
                                when you book with us.
                            </p>
                        </div>
                    </div>

                    <div className="boat-transfer-banner">
                        <Image
                            src={BGHero}
                            alt="about home"
                            fill
                            priority
                            className="object-fit-cover"
                        />

                        <div className="px-50 position-relative d-flex flex-column justify-content-center align-items-end h-100 text-white">
                            <div>
                                <div className="vstack gap-3">
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

                    <div className="mt-70">
                        <div className="row boat-transfer-card-g ">
                            <div className="col-lg-4 col-md-6 col-12">
                                <BoatTransferCard
                                    onBook={() =>
                                        actionModal(MDBoatTransferBooking)
                                    }
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <BoatTransferCard
                                    onBook={() =>
                                        actionModal(MDBoatTransferBooking)
                                    }
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <BoatTransferCard
                                    onBook={() =>
                                        actionModal(MDBoatTransferBooking)
                                    }
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <BoatTransferCard
                                    onBook={() =>
                                        actionModal(MDBoatTransferBooking)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                                PRIVATE CHARTER
                            </SectionTitle>
                        </div>

                        <div className="col-md-4 offset-1">
                            <p className="font-tt-drugs">
                                Make the journey entirely yours with a private
                                boat charter to Nusa Lembongan, perfect for
                                families, groups, or a little extra freedom.
                                Travel at your own pace, choose your departure
                                time, and enjoy a more personal island transfer
                                experience.
                            </p>
                        </div>
                    </div>

                    <div className="mt-70">
                        <div className="row boat-transfer-card-g ">
                            <div className="col-md-6 col-12">
                                <BoatTransferCard />
                            </div>
                            <div className="col-md-6 col-12">
                                <BoatTransferCard />
                            </div>
                            <div className="col-md-6 col-12">
                                <BoatTransferCard />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BoatTransferBookingModal />
        </>
    )
}

export default BoatTransferMain
