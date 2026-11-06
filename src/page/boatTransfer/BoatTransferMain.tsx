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
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getListIslandGuide } from '@/service/api/islandGuide.api'
import Pagination from '@/component/general/Pagination'
import LoadingCardListData from '@/component/loading/LoadingCardListData'

const BoatTransferMain = ({
    SECTION2,
    SECTION3,
}: {
    SECTION2: any
    SECTION3: any
}) => {
    const [selectedId, setSelectedId] = useState<number>()

    const {
        list: boatSection2,
        isLoading: boatSection2Loading,
        pagination: boatSection2Pagination,
        _handleChangePage: _handleChangePageBoatSection2,
    } = useGeneralDataList({
        configSearch: {
            page: 1,
            boatComponentTypeIds: [SECTION2.boatTypeId],
        },
        urlAPI: getBoatList,
    })

    const {
        list: boatSection3,
        isLoading: boatSection3Loading,
        pagination: boatSection3Pagination,
        _handleChangePage: _handleChangePageBoatSection3,
    } = useGeneralDataList({
        configSearch: {
            page: 1,
            boatComponentTypeIds: [SECTION3.boatTypeId],
        },
        urlAPI: getBoatList,
    })

    const _handleBook = (boatId: number) => {
        setSelectedId(boatId)
        actionModal(MDBoatTransferBooking)
    }

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
                        {boatSection2Loading ? (
                            <LoadingCardListData />
                        ) : (
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
                        )}

                        <div className="py-5">
                            <Pagination
                                // @ts-ignore
                                pagination={boatSection2Pagination}
                                onPageChange={(passPage) =>
                                    _handleChangePageBoatSection2(passPage)
                                }
                            />
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
                        {boatSection3Loading ? (
                            <LoadingCardListData />
                        ) : (
                            <div className="row boat-transfer-card-g ">
                                {boatSection3.map((boat) => (
                                    <div
                                        className="col-md-6 col-12"
                                        key={boat.id}>
                                        <BoatTransferCard
                                            boat={boat}
                                            onBook={() => _handleBook(boat.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="py-5">
                        <Pagination
                            // @ts-ignore
                            pagination={boatSection3Pagination}
                            onPageChange={(passPage) =>
                                _handleChangePageBoatSection3(passPage)
                            }
                        />
                    </div>
                </div>
            </section>

            <BoatTransferBookingModal boatId={selectedId} />
        </>
    )
}

export default BoatTransferMain
