import {
    DescriptionContentText,
    TitleContentText,
} from '@/component/general/ContentText'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import Image from 'next/image'
import BgContent1 from '@/asset/image/dummy/offer-content-1.jpg'
import BgContent2 from '@/asset/image/dummy/offer-content-2.jpg'
import { BtnBasic, BtnLinkBasic } from '@/component/general/Button'
import IconArrowRight from '@/component/icon/IconArrowRight'

const OfferContentCard = ({
    src = '',
    title = '',
    description = '',
    link = '#',
}) => {
    return (
        <>
            <Link
                href={link}
                className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden">
                <WrapImageHoverOverlay className="overflow-hidden img-h-392px">
                    <Image
                        src={imgReelConfig(src)}
                        alt={title || 'Offer Content'}
                        fill
                        className="object-fit-cover"
                    />
                </WrapImageHoverOverlay>

                <div className="pt-2">
                    <p className="fs-24 mb-1 wp-font-tt-drugs desc-two-line text-neutral-900">
                        {title}
                    </p>

                    <p className="fs-13 wp-font-tt-drugs mb-3 text-grey-400">
                        {description}
                    </p>

                    <div className="pt-2">
                        <BtnBasic
                            type="button"
                            className="btn-outline-grey-100 rounded-pill"
                            href={'#'}>
                            <div className="hstack align-items-center gap-1">
                                EXPLORE DETAILS <IconArrowRight />
                            </div>
                        </BtnBasic>
                    </div>
                </div>
            </Link>
        </>
    )
}

const objectData = (
    title = '',
    description = '',
    src: any = '',
    link = '',
) => ({
    title,
    description,
    src,
    link,
})

const SectionOfferMainInfo = () => {
    const listData: any[] = [
        objectData(
            'BOOK IN ADVANCE',
            'Book ahead and secure your stay for 2026 island escape and get a special rate.',
            BgContent1,
            '/offer/book-in-advance',
        ),
        objectData(
            'LAST MINUTE GETAWAY',
            'From now until May is the perfect time to slip away to the island. Book direct and get the best rate on our website.',
            BgContent2,
            '/offer/last-minute-gateaway',
        ),
    ]

    return (
        <section className="section-space bg-white">
            <div className="container">
                <div className="row gx-5 gy-3 mb-5">
                    <div className="col-md-6">
                        <TitleContentText>
                            ALL LIMITED TIME PROMOTIONS
                        </TitleContentText>
                    </div>

                    <div className="col-md-6">
                        <DescriptionContentText>
                            Enjoy limited-time offers on your Nusa Lembongan
                            stay with The Lembongan Traveller. Whether you’re
                            planning your dream holiday well in advance or
                            looking for a spontaneous beach escape, our
                            exclusive promotions and last-minute bookings make
                            it easy to find the perfect stay at the best rate
                            with various property options from bungalows,
                            resorts, to private villas. Start your island
                            adventure with offers designed to make your stay
                            unforgettable.
                        </DescriptionContentText>
                    </div>
                </div>

                <div className="row g-4 pt-5">
                    {listData.map((vm, index) => {
                        return (
                            <div className="col-md-6" key={index}>
                                <OfferContentCard {...vm} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SectionOfferMainInfo
