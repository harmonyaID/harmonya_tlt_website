'use client'

import { SectionTitle } from '@/component/text/Heading'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnLinkPrimary } from '@/component/general/Button'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { getTeamList } from '@/service/api/about.api'
import { isSuccess } from '@/helper/base/condition.helper'
import {
    ABOUT_HOLIDAY_BOOKING_PATH,
    ABOUT_PROPERTY_MANAGEMENT_PATH,
    STAY_PATH,
} from '@/config/pagePath.config'
import RenderHtml from '@/component/general/RenderHtml'

const AboutUsMain = ({
    SECTION2,
    SECTION3,
    SECTION4,
}: {
    SECTION2: any
    SECTION3: any
    SECTION4: any
}) => {
    const [isLoadingTeam, setIsLoadingTeam] = useState(false)
    const [team, setTeam] = useState<any>([])

    const _handleGetTeam = () => {
        getTeamList({}).then((res) => {
            if (isSuccess(res)) {
                setTeam(res.result)
            }
        })
    }

    const groupedTeam = useMemo(() => {
        const regrouped = Object.groupBy(
            team.toSorted((a, b) => a.level - b.level || a.order - b.order),
            (item: any) => item.level,
        )

        return Object.values(regrouped)
    }, [team])

    useEffect(() => {
        _handleGetTeam()
    }, [])

    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="text-center vstack gap-4 px-5 font-tt-drugs ">
                        <SectionTitle className="text-uppercase fw-light">
                            {SECTION2?.title}
                        </SectionTitle>
                        <RenderHtml html={SECTION2?.description} />
                    </div>
                </div>

                <div className="container-fluid mt-70 px-5">
                    <SwipeSlideBanner
                        items={SECTION2?.posts || []}
                        breakpoints={{
                            576: { slidesPerView: 1, spaceBetween: 20 },
                            992: { slidesPerView: 1, spaceBetween: 24 },
                            1200: { slidesPerView: 1.2, spaceBetween: 24 },
                        }}
                        swiperConfig={{
                            loop: true,
                        }}
                        contentElement={(dataElement: any) => (
                            <div className="row g-5">
                                <div className="col">
                                    <Link
                                        className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                        href={dataElement.buttonLink || '#'}>
                                        <WrapImageHoverOverlay
                                            className="section-boat-banner-reel"
                                            contentOverlay={null}>
                                            <Image
                                                src={dataElement?.image}
                                                alt={dataElement.year}
                                                fill
                                                className="object-fit-cover"
                                            />
                                        </WrapImageHoverOverlay>
                                    </Link>
                                </div>
                                <div className="col-md-5 font-tt-drugs color-555">
                                    <div
                                        className="vstack gap-4 justify-content-center h-100 ps-5"
                                        style={{
                                            maxWidth: '380px',
                                        }}>
                                        <p className="mb-0 fs-48">
                                            {dataElement?.year}
                                        </p>
                                        <RenderHtml
                                            html={dataElement?.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </section>

            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                                {SECTION3?.title}
                            </SectionTitle>
                        </div>

                        <div className="col offset-1 font-tt-drugs">
                            <RenderHtml html={SECTION3?.subTitle} />
                        </div>
                    </div>

                    <div className="mt-70">
                        <div
                            className="row gx-5"
                            style={{
                                margin: '120px 0',
                            }}>
                            <div className="col">
                                <div className="w-100 vstack gap-3 text-grey-200 wp-hover-image">
                                    <WrapImageHoverOverlay
                                        className="section-boat-banner-reel"
                                        contentOverlay={null}>
                                        <Image
                                            src={SECTION3?.SubSection1?.image}
                                            alt="test"
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </WrapImageHoverOverlay>
                                </div>
                            </div>
                            <div className="col-md-6 font-tt-drugs color-555">
                                <div
                                    className="vstack gap-3 justify-content-center h-100"
                                    style={{
                                        paddingLeft: '50px',
                                    }}>
                                    <div>
                                        <p
                                            className="m-0 mb-2 fs-48 text-uppercase"
                                            style={{
                                                lineHeight: '100%',
                                            }}>
                                            {SECTION3?.SubSection1?.title}
                                        </p>
                                        <p className="m-0 fs-24 text-uppercase">
                                            {SECTION3?.SubSection1?.subTitle}
                                        </p>
                                    </div>
                                    <div className="font-tt-drugs">
                                        <RenderHtml
                                            html={
                                                SECTION3?.SubSection1
                                                    ?.description
                                            }
                                        />
                                    </div>

                                    <BtnLinkPrimary
                                        href={STAY_PATH}
                                        isIconArrow
                                        className="width-fit-content rounded-pill text-uppercase">
                                        Book a stay
                                    </BtnLinkPrimary>
                                </div>
                            </div>
                        </div>

                        <div
                            className="row gx-5 flex-row-reverse"
                            style={{
                                margin: '120px 0',
                            }}>
                            <div className="col">
                                <div className="w-100 vstack gap-3 text-grey-200 wp-hover-image">
                                    <WrapImageHoverOverlay
                                        className="section-boat-banner-reel"
                                        contentOverlay={null}>
                                        <Image
                                            src={SECTION3?.SubSection2?.image}
                                            alt="test"
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </WrapImageHoverOverlay>
                                </div>
                            </div>
                            <div className="col-md-6 font-tt-drugs color-555">
                                <div
                                    className="vstack gap-3 justify-content-center h-100"
                                    style={{
                                        paddingRight: '50px',
                                    }}>
                                    <div>
                                        <p
                                            className="m-0 mb-2 fs-48 text-uppercase"
                                            style={{
                                                lineHeight: '100%',
                                            }}>
                                            {SECTION3?.SubSection2?.title}
                                        </p>
                                        <p className="m-0 fs-24 text-uppercase">
                                            {SECTION3?.SubSection2?.subTitle}
                                        </p>
                                    </div>
                                    <div className="font-tt-drugs">
                                        <RenderHtml
                                            html={
                                                SECTION3?.SubSection2
                                                    ?.description
                                            }
                                        />
                                    </div>

                                    <BtnLinkPrimary
                                        href={ABOUT_PROPERTY_MANAGEMENT_PATH}
                                        isIconArrow
                                        className="width-fit-content rounded-pill text-uppercase">
                                        DISCUSS YOUR PROPERTY
                                    </BtnLinkPrimary>
                                </div>
                            </div>
                        </div>

                        <div
                            className="row gx-5"
                            style={{
                                margin: '120px 0',
                            }}>
                            <div className="col">
                                <div className="w-100 vstack gap-3 text-grey-200 wp-hover-image">
                                    <WrapImageHoverOverlay
                                        className="section-boat-banner-reel"
                                        contentOverlay={null}>
                                        <Image
                                            src={SECTION3?.SubSection3?.image}
                                            alt="test"
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </WrapImageHoverOverlay>
                                </div>
                            </div>
                            <div className="col-md-6 font-tt-drugs color-555">
                                <div
                                    className="vstack gap-3 justify-content-center h-100"
                                    style={{
                                        paddingLeft: '50px',
                                    }}>
                                    <div>
                                        <p
                                            className="m-0 mb-2 fs-48 text-uppercase"
                                            style={{
                                                lineHeight: '100%',
                                            }}>
                                            {SECTION3?.SubSection3?.title}
                                        </p>
                                        <p className="m-0 fs-24 text-uppercase">
                                            {SECTION3?.SubSection3?.subTitle}
                                        </p>
                                    </div>
                                    <div className="font-tt-drugs">
                                        <RenderHtml
                                            html={
                                                SECTION3?.SubSection3
                                                    ?.description
                                            }
                                        />
                                    </div>

                                    <BtnLinkPrimary
                                        href={SECTION3?.SubSection3?.file}
                                        target="_blank"
                                        isIconArrow
                                        className="width-fit-content rounded-pill text-uppercase">
                                        List With us
                                    </BtnLinkPrimary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <div className="text-center vstack gap-4 px-5">
                        <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                            {SECTION4?.title}
                        </SectionTitle>
                        <div className="font-tt-drugs">
                            <RenderHtml html={SECTION4?.subTitle} />
                        </div>
                    </div>

                    {groupedTeam.map((group, index) => (
                        <div
                            className="row mt-70 gx-5 justify-content-center"
                            key={index}>
                            {group.map((vm) => (
                                <div
                                    key={vm.id}
                                    className="col-lg-3 col-sm-6 col-12">
                                    <div className="overflow-hidden d-flex justify-content-center">
                                        <Image
                                            src={vm.photo}
                                            alt={vm.name}
                                            width={342}
                                            height={459}
                                            className="object-fit-cover"
                                        />
                                    </div>
                                    <div className="text-center color-555">
                                        <p className="font-tt-drugs fs-24 text-primary mb-1 mt-3">
                                            {vm.name}
                                        </p>
                                        <p className="font-tt-drugs text-primary fs-16 mb-1">
                                            {vm.role}
                                        </p>
                                        <hr className="my-3 p-0" />
                                        <p className="mb-1 fs-16 fw-semibold">
                                            {vm.question}
                                        </p>
                                        <RenderHtml html={vm.answer} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default AboutUsMain
