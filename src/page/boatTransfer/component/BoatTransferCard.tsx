'use client'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import {
    BtnBasic,
    BtnLinkPrimary,
    BtnPrimary,
    CodeIconArrow,
} from '@/component/general/Button'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import Link from 'next/link'
import Image from 'next/image'
import actionModal from '@/helper/base/actionModal.helper'
import { MDBoatTransferBooking } from '@/config/modal.config'
import { BOAT_TRANSFERS_PATH } from '@/config/pagePath.config'
import { Fragment } from 'react'

const BoatTransferCard = ({
    isSimple = false,
    onBook,
    boat,
}: {
    isSimple?: boolean
    boat: any
    onBook?: () => void
}) => {
    const detailPath = `${BOAT_TRANSFERS_PATH}/${boat?.seo?.slug}`

    return (
        <div className="vstack gap-4 position-relative">
            {boat?.discountLabel && (
                <div className="position-absolute top-0 end-20 z-1">
                    <div className="boat-transfer-card-promo text-white font-tt-drugs text-center">
                        {boat?.discountLabel?.split(' ')?.map((vm, index) => (
                            <p className="m-0 fs-12 text-uppercase" key={index}>
                                {vm}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            <Link
                className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden boat-transfer-card"
                href={detailPath}>
                <WrapImageHoverOverlay
                    className="banner"
                    contentOverlay={
                        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <BtnBasic className="btn-outline-white rounded-pill">
                                <div className="hstack align-items-center gap-1">
                                    Explore <CodeIconArrow />
                                </div>
                            </BtnBasic>
                        </div>
                    }>
                    <Image
                        src={BGHero}
                        alt="about home"
                        fill
                        priority
                        className="object-fit-cover"
                    />
                </WrapImageHoverOverlay>
            </Link>

            <p className="fs-32 fw-light mb-1 font-tt-drugs text-uppercase">
                {boat?.name}
            </p>

            {!isSimple && (
                <>
                    <div className="fs-16 fw-light mb-1 font-tt-drugs">
                        {boat?.description}
                    </div>

                    {boat?.schedule &&
                        boat?.schedule?.map((schedule, index) => (
                            <Fragment key={index}>
                                <div>
                                    <p className="font-tt-drugs mb-1 fw-medium">
                                        {schedule.from} → {schedule.to}
                                    </p>

                                    <div className="hstack gap-2">
                                        {schedule.times?.map((time, index) => (
                                            <div
                                                key={index}
                                                className="badge text-black border rounded-pill fw-300 width-fit-content">
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {index !== boat.schedule.length - 1 && (
                                    <hr className="m-0 p-0" />
                                )}
                            </Fragment>
                        ))}
                    <div className="hstack gap-2 mt-3">
                        <BtnLinkPrimary
                            href={detailPath}
                            isOutline
                            className="rounded-pill fs-14 w-100">
                            MORE DETAILS
                        </BtnLinkPrimary>
                        <BtnPrimary
                            handle={onBook}
                            className="rounded-pill text-white fs-14 w-100">
                            BOOK NOW
                        </BtnPrimary>
                    </div>
                </>
            )}
        </div>
    )
}

export default BoatTransferCard
