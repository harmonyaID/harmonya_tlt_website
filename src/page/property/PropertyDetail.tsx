'use client'
import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'
import PropertySliderAndGallery from '@/page/property/container/PropertySliderAndGallery'
import { CardContactInfoMain } from '@/component/general/CardContactInfo'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { CheckCircle, ArrowRight } from 'feather-icons-react'
import Image from 'next/image'
import PropertyThingsToExplore from '@/page/property/container/PropertyThingsToExplore'
import PropertyOther from '@/page/property/container/PropertyOther'
import PropertyFormInquiry from '@/page/property/container/PropertyFormInquiry'

const TitleSection = ({ title }: { title: string }) => (
    <>
        <p className="fs-32 text-grey-200 text-uppercase">{title}</p>
    </>
)

const PropertyDetail = ({
    detail = {},
    allSlug = [],
}: {
    detail?: any
    allSlug?: any
}) => {
    console.log('propertyDetail: ', detail)

    console.log('description: ', detail.descriptions)

    const { amenities = [], floorplanImage = '', seo = {} } = detail

    return (
        <>
            {/*Slider*/}
            <section className="w-100 py-4">
                <PropertySliderAndGallery photos={detail.photos} />
            </section>

            {/*Information*/}
            <section className="pt-4 section-space-small-bottom">
                <div className="container">
                    <div className="pb-3">
                        <Breadcrumb isLabelHome />
                    </div>

                    <div className="row justify-content-between">
                        <div className="col-md-7 ">
                            <div className="vstack gap-4">
                                <div className="">
                                    <h1 className="font-tt-drugs fs-48 pb-2 text-grey-200">
                                        {detail.nickname}
                                    </h1>

                                    {/*<SectionDescription>*/}
                                    {/*    {detail.descriptions[0].summary}*/}
                                    {/*</SectionDescription>*/}
                                    <RenderHtml
                                        html={detail.descriptions[0].summary}
                                        className="text-grey-400"
                                    />
                                </div>

                                <hr />

                                <div className="">
                                    <TitleSection title="Features" />

                                    <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="hstack gap-3 align-items-start text-grey-200">
                                                <div className="">
                                                    <CheckCircle
                                                        size="20"
                                                        strokeWidth="2"
                                                    />
                                                </div>

                                                <p className="fs-20 mb-0 text-grey-200">
                                                    {detail.occupancy} Guest
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {amenities && amenities.length > 0 ? (
                                    <>
                                        <hr />
                                        <div className="">
                                            <TitleSection title="AMENITIES & SERVICES" />
                                            {/*AMENITIES & Services*/}

                                            <div className="row gx-3 gy-4">
                                                {amenities.map((vm, index) => {
                                                    return (
                                                        <div
                                                            className="col-lg-4 col-md-6"
                                                            key={index}>
                                                            <div className="hstack gap-3 align-items-start text-grey-200">
                                                                <div className="">
                                                                    <CheckCircle
                                                                        size="20"
                                                                        strokeWidth="2"
                                                                    />
                                                                </div>

                                                                <p className="fs-20 mb-0 text-grey-200">
                                                                    {vm.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                                {floorplanImage ? (
                                    <>
                                        <hr />
                                        <div className="">
                                            <TitleSection title="Floor Plan" />
                                            {/*Floor Plan*/}
                                            <div className="w-100 h-320-px position-relative overflow-hidden">
                                                <Image
                                                    src={floorplanImage}
                                                    alt={
                                                        detail.nickname ||
                                                        'The Lembongan'
                                                    }
                                                    fill
                                                    className="w-100 h-auto object-fit-cover position-relative"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                                <hr />
                                <div className="">
                                    <TitleSection title="Availability" />
                                    {/*Availability*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="ACCOMMODATION" />
                                    {/*ACCOMMODATION*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="Why you’ll love this" />
                                    {/*Why you’ll love this*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="Fine Print" />
                                    {/*Fine Print*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="Location" />
                                    {/*Location*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="REVIEWS" />
                                    {/*REVIEWS*/}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 border border-neutral-200 rounded-4">
                                <p className="fs-18 font-tt-drugs fw-600 text-grey-200 pt-3">
                                    SEARCH AVAILABLE DATE
                                </p>

                                <hr />

                                <div className="row g-2">
                                    <div className="col-lg-6 col-md-12">
                                        <BtnPrimary className="rounded-pill w-100">
                                            SHARE
                                        </BtnPrimary>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <BtnPrimary
                                            className="rounded-pill w-100"
                                            isOutline>
                                            ASK QUESTION
                                        </BtnPrimary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PropertyThingsToExplore />
            <PropertyOther allSlug={allSlug} />
            <PropertyFormInquiry />
        </>
    )
}

export default PropertyDetail
