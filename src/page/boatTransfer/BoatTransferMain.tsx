'use client'

import { SectionTitle } from '@/component/text/Heading'
import Image from 'next/image'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import BoatTransferCard from '@/page/boatTransfer/component/BoatTransferCard'
import BoatTransferBookingModal from '@/page/boatTransfer/component/BoatTransferBookingModal'
import actionModal from '@/helper/base/actionModal.helper'
import { MDBoatTransferBooking } from '@/config/modal.config'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import Breadcrumb from '@/component/general/Breadcrumb'
import { getBoatList } from '@/service/api/boatTransfer.api'
import { useEffect, useState } from 'react'

const BoatTransferMain = ({
    SECTION2,
    SECTION3,
}: {
    SECTION2: any
    SECTION3: any
}) => {
    const [selectedId, setSelectedId] = useState<number>()
    const [boatSection2, setBoatSection2] = useState<any>([])
    const [boatSection3, setBoatSection3] = useState<any>([])

    const _handleGetData = () => {
        getBoatList(
            {
                boatComponentTypeIds: [SECTION2.boatTypeId],
            },
            'tcBoatSection2',
        ).then((res) => {
            setBoatSection2(res.result)
        })

        getBoatList(
            {
                boatComponentTypeIds: [SECTION3.boatTypeId],
            },
            'tcBoatSection3',
        ).then((res) => {
            setBoatSection3(res.result)
        })
    }

    const _handleBook = (boatId: number) => {
        setSelectedId(boatId)
        actionModal(MDBoatTransferBooking)
    }

    useEffect(() => {
        _handleGetData()
    }, [])

    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="row mb-90">
                        <div className="col-md-7">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                                {SECTION2.title}
                            </SectionTitle>
                        </div>

                        <div className="col-md-4 offset-1">
                            <p className="font-tt-drugs">{SECTION2.subTitle}</p>
                        </div>
                    </div>

                    <div className="boat-transfer-banner">
                        <Image
                            src={SECTION2.bannerPromoImage}
                            alt="about home"
                            fill
                            priority
                            className="object-fit-cover"
                        />
                    </div>

                    <div className="mt-70">
                        <div className="row boat-transfer-card-g ">
                            {boatSection2.map((boat) => (
                                <div
                                    className="col-lg-4 col-md-6 col-12"
                                    key={boat.id}>
                                    <BoatTransferCard
                                        boat={boat}
                                        onBook={() => _handleBook(boat.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                                {SECTION3.title}
                            </SectionTitle>
                        </div>

                        <div className="col-md-4 offset-1">
                            <p className="font-tt-drugs">{SECTION3.subTitle}</p>
                        </div>
                    </div>

                    <div className="mt-70">
                        <div className="row boat-transfer-card-g ">
                            {boatSection3.map((boat) => (
                                <div className="col-md-6 col-12" key={boat.id}>
                                    <BoatTransferCard
                                        boat={boat}
                                        onBook={() => _handleBook(boat.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <BoatTransferBookingModal boatId={selectedId} />
        </>
    )
}

export default BoatTransferMain
