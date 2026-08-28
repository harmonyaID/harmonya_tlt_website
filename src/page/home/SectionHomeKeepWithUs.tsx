'use client'
import SectionGeneral from '@/component/general/SectionGeneral'
import { BtnLinkBasic, IconArrowGray } from '@/component/general/Button'
import Image from 'next/image'
import KeepUp01 from '@/asset/image/home/home-keep-up-01.jpg'
import KeepUp02 from '@/asset/image/home/home-keep-up-02.jpg'
import KeepUp03 from '@/asset/image/home/home-keep-up-03.jpg'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { ReactNode } from 'react'
import Link from 'next/link'

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
        <Link href={link}>
            <WrapImageHoverOverlay
                className="wp-banner-img"
                contentOverlay={message}>
                <Image src={src} className="object-fit-cover w-100" alt={alt} />

                {moreInfo}
            </WrapImageHoverOverlay>
        </Link>
    )
}

const SectionHomeKeepWithUs = ({ content = {} }: PropsSectionContent) => {
    return (
        <SectionGeneral className="container section-home-keep-us">
            <div className="hstack flex-wrap justify-content-between gap-3">
                {/*<SectionTitle>KEEP UP WITH US</SectionTitle>*/}

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
                <div className="col-lg-3 col-md-6">
                    <CardImage
                        src={KeepUp02}
                        alt="keep 01"
                        moreInfo={
                            <div className="position-absolute second-info top-0 end-0 pt-3 pe-3">
                                <div className="">
                                    <div className="bg-green-700 rounded-pill px-3 fs-16 text-white">
                                        EAT
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
                <div className="col-lg-3 col-md-6">
                    <CardImage
                        src={KeepUp01}
                        alt="keep 01"
                        moreInfo={
                            <div className="position-absolute second-info top-0 end-0 pt-3 pe-3">
                                <div className="">
                                    <div className="bg-green-500 rounded-pill px-3 fs-16 text-white">
                                        ISLAND INFO
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
                <div className="col-lg-6">
                    <CardImage
                        src={KeepUp03}
                        alt="keep 01"
                        message={
                            <div className="message-bottom text-white px-5 pb-5">
                                <p className="fs-24 font-tt-drugs text-uppercase">
                                    Reaching Out with Care: Health Visits to
                                    Nusa Ceningan
                                </p>

                                <p className="fs-16 fw-light mb-0">
                                    Reaching Out with Care: Health Visits to
                                    Nusa Ceningan Our Love for Lembongan journey
                                    took
                                </p>
                            </div>
                        }
                        moreInfo={
                            <div className="position-absolute second-info top-0 end-0 pt-3 pe-3">
                                <div className="">
                                    <div className="bg-green-500 rounded-pill px-3 fs-16 text-white">
                                        COMMUNITY
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeKeepWithUs
