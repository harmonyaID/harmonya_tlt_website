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
import RenderHtml from '@/component/general/RenderHtml'
import { OFFER_SLUG_PATH } from '@/config/pagePath.config'

const OfferContentCard = ({
    src = '',
    title = '',
    // description = '',
    excerpt = '',
    slug = '',
    href = '#',
}) => {
    return (
        <>
            <Link
                href={href}
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

                    {/*<p className="fs-13 wp-font-tt-drugs mb-3 text-grey-400">*/}
                    {/*    {description}*/}
                    {/*</p>*/}

                    <RenderHtml
                        html={excerpt}
                        className="mb-3 text-grey-400 fs-13"
                    />

                    <div className="pt-2">
                        <BtnBasic
                            type="button"
                            className="btn-outline-grey-100 rounded-pill"
                            href={href}>
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

interface Props {
    content?: any
    list?: any
    pagination?: any
    basicSlug?: string
}

const SectionOfferMainInfo = ({
    content,
    list = [],
    pagination = {},
    basicSlug = '',
}: Props) => {
    return (
        <section className="section-space bg-white">
            <div className="container">
                <div className="row gx-5 gy-3 mb-5">
                    <div className="col-md-6">
                        <TitleContentText>{content.title}</TitleContentText>
                    </div>

                    <div className="col-md-6">
                        <RenderHtml
                            className="fs-20 fw-light text-grey-400"
                            html={content.description}
                        />
                    </div>
                </div>

                <div className="row gx-4 gy-5 pt-5">
                    {list.map((vm: any, index: number) => {
                        return (
                            <div className="col-md-6" key={index}>
                                <OfferContentCard
                                    {...vm}
                                    src={vm.thumbnail || ''}
                                    href={
                                        vm.slug
                                            ? '/' + basicSlug + '/' + vm.slug
                                            : '#'
                                    }
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SectionOfferMainInfo
