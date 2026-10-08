'use client'
import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'
import PropertySliderAndGallery from '@/page/property/container/PropertySliderAndGallery'
import { CardContactInfoMain } from '@/component/general/CardContactInfo'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { CheckCircle, ArrowRight } from 'feather-icons-react'
import Image from 'next/image'

const TitleSection = ({ title }: { title: string }) => (
    <>
        <p className="fs-32 text-grey-200 text-uppercase">{title}</p>
    </>
)

const PropertyDetail = ({ detail = {} }: { detail?: any }) => {
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
            <section className="py-4">
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
                                                            className="col-md-4"
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
                                            {/*AMENITIES & Services*/}
                                            <div className="w-100 h-320-px position-relative">
                                                <Image
                                                    src={floorplanImage}
                                                    alt={
                                                        detail.nickname ||
                                                        'The Lembongan'
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                                <hr />
                                <div className="">
                                    <TitleSection title="Availability" />
                                    {/*AMENITIES & Services*/}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 border border-neutral-200 rounded-4">
                                <p className="fs-18 font-tt-drugs fw-600 text-grey-200 pt-3">
                                    SEARCH AVAILABLE DATE
                                </p>

                                <hr />

                                <div className="hstack gap-2">
                                    <BtnPrimary className="rounded-pill w-100">
                                        SHARE
                                    </BtnPrimary>

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
            </section>
        </>
    )
}

export default PropertyDetail
