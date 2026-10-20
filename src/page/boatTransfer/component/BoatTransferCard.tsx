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

const BoatTransferCard = ({
    isSimple = false,
    onBook,
}: {
    isSimple?: boolean
    onBook?: () => void
}) => {
    return (
        <div className="vstack gap-4 position-relative">
            <div className="position-absolute top-0 end-20 z-1">
                <div className="boat-transfer-card-promo text-white font-tt-drugs text-center">
                    <p className="m-0 mt-1 promo-text">20%</p>
                    <p className="m-0 fs-12 text-uppercase">OFF</p>
                </div>
            </div>

            <Link
                className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden boat-transfer-card"
                href={'#'}>
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
                BAli hai cruises
            </p>

            {!isSimple && (
                <>
                    <p className="fs-16 fw-light mb-1 font-tt-drugs">
                        Bali Hai Cruises offers a premium island transfer
                        experience aboard luxury vessels, complete with onboard
                        entertainment and full bar service.
                    </p>
                    <div>
                        <p className="font-tt-drugs mb-1 fw-medium">
                            Benoa → Mushroom Bay
                        </p>

                        <div className="badge text-black border rounded-pill fw-300 width-fit-content">
                            9 AM
                        </div>
                    </div>
                    <hr className="m-0 p-0" />
                    <div>
                        <p className="font-tt-drugs mb-1 fw-medium">
                            Benoa → Mushroom Bay
                        </p>

                        <div className="badge text-black border rounded-pill fw-300 width-fit-content">
                            9 AM
                        </div>
                    </div>
                    <div className="hstack gap-2 mt-3">
                        <BtnLinkPrimary
                            href="/boat-transfers/test-slug"
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
