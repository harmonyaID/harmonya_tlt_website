'use client'
import SectionGeneral from '@/component/general/SectionGeneral'
import { BtnLinkBasic, IconArrowGray } from '@/component/general/Button'
import KeepUp01 from '@/asset/image/home/home-keep-up-01.jpg'
import KeepUp02 from '@/asset/image/home/home-keep-up-02.jpg'
import KeepUp03 from '@/asset/image/home/home-keep-up-03.jpg'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { imgReelConfig } from '@/config/urlImage.config'
import ValidImage from '@/component/general/ValidImage'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'

const CardImage = ({
    src,
    alt = 'the lembongan',
    message = '',
    link = '#',
    moreInfo = '',
}: {
    src?: any
    alt?: string
    link?: string
    message?: ReactNode
    moreInfo?: ReactNode
}) => {
    return (
        <Link href={link || '#'}>
            <WrapImageHoverOverlay
                className="wp-banner-img"
                contentOverlay={message}>
                <ValidImage
                    src={src}
                    fallbackSrc={imgReelConfig()}
                    className="object-fit-cover w-100 h-100"
                    alt={alt}
                    fill
                />

                {moreInfo}
            </WrapImageHoverOverlay>
        </Link>
    )
}

const UIMoreInfo = ({ name = '' }: { name?: string }) => (
    <div className="position-absolute second-info top-0 end-0 pt-3 pe-3">
        <div className="">
            <div className="bg-green-500 rounded-pill px-3 py-1 fs-16 text-white">
                {name}
            </div>
        </div>
    </div>
)

const SectionHomeKeepWithUs = ({
    content = {},
    list = [],
}: PropsSectionContent & { list?: any }) => {
    // const {list, isLoading,} = useGeneralDataList({
    //     configSearch: {
    //         page: 0
    //     }
    // })

    const typeOne = list[0] || {}
    const typeOneSEO = typeOne ? typeOne?.seo : {}

    const typeTwo = list[1] || {}
    const typeTwoSEO = typeTwo ? typeTwo?.seo : {}

    const typeThree = list[2] || {}
    const typeThreeSEO = typeThree ? typeThree?.seo : {}

    return (
        <SectionGeneral className="container section-home-keep-us">
            <div className="hstack flex-wrap justify-content-between gap-3">
                <RenderHtml
                    className="wp-font-tt-drugs text-grey-200"
                    html={content.content || ''}
                />

                <BtnLinkBasic className="btn-outline-grey-100 font-tt-drugs rounded-pill hover-icon-white">
                    <div className="hstack align-items-center gap-1">
                        More Articles <IconArrowGray />
                    </div>
                </BtnLinkBasic>
            </div>

            <div className="row pt-5 g-4">
                {typeOne ? (
                    <div className="col-lg-3 col-md-6">
                        <CardImage
                            src={typeOne.featuredImage || ''}
                            alt={typeOne.name || ''}
                            moreInfo={<UIMoreInfo name={typeOne.name} />}
                            link={typeOneSEO?.canonicalUrl || '#'}
                        />
                    </div>
                ) : null}

                {typeTwo ? (
                    <div className="col-lg-3 col-md-6">
                        <CardImage
                            src={typeTwo.featuredImage || ''}
                            alt={typeTwo.name || ''}
                            moreInfo={<UIMoreInfo name={typeTwo.name} />}
                            link={typeTwoSEO?.canonicalUrl || '#'}
                        />
                    </div>
                ) : null}

                {typeThree && typeThree.id ? (
                    <div className="col-lg-6">
                        <CardImage
                            src={typeThree.featuredImage || ''}
                            alt={typeThree.name || ''}
                            moreInfo={<UIMoreInfo name={typeThree.name} />}
                            link={typeThreeSEO?.canonicalUrl || '#'}
                            message={
                                <div className="message-bottom text-white px-5 pb-5">
                                    {/*<p className="fs-24 font-tt-drugs text-uppercase">*/}
                                    {/*    Reaching Out with Care: Health Visits to*/}
                                    {/*    Nusa Ceningan*/}
                                    {/*</p>*/}

                                    {/*<p className="fs-16 fw-light mb-0">*/}
                                    {/*    Reaching Out with Care: Health Visits to*/}
                                    {/*    Nusa Ceningan Our Love for Lembongan*/}
                                    {/*    journey took*/}
                                    {/*</p>*/}

                                    <RenderHtml
                                        className="fs-20 text-white wp-head-font-tt-drugs mb-4 text-clamp-3"
                                        // @ts-ignore
                                        html={typeThree.description}
                                    />
                                </div>
                            }
                        />
                    </div>
                ) : null}
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeKeepWithUs
