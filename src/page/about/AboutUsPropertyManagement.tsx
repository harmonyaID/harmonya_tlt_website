'use client'

import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import Image from 'next/image'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import { BtnLinkPrimary } from '@/component/general/Button'
import { ABOUT_HOLIDAY_BOOKING_PATH } from '@/config/pagePath.config'
import { SectionTitle } from '@/component/text/Heading'
import {
    IconCalendarCheck,
    IconCheckBoard,
    IconCoinChart,
    IconEarthUser,
    IconGearUserCheck,
    IconHandBuilding,
    IconHouseHand,
} from '@/page/about/component/AboutUsIcons'
import Link from 'next/link'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'

const AboutUsPropertyManagement = () => {
    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col">
                            <div className="w-100 vstack gap-3 text-grey-200 wp-hover-image">
                                <WrapImageHoverOverlay
                                    className="section-boat-banner-reel"
                                    contentOverlay={null}>
                                    <Image
                                        src={BGHero}
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
                                        Lembongan&apos;s Property Management &
                                        Destination Specialist.
                                    </p>
                                    <p className="m-0 fs-24 text-uppercase">
                                        YOUR PROPERTY. OUR PRIORITY.
                                    </p>
                                </div>
                                <p className="m-0 fw-light">
                                    Professional property management, Sales
                                    Marketing and bookings expertise for villas
                                    and boutique resorts across Nusa Lembongan &
                                    Nusa Ceningan.
                                </p>

                                <BtnLinkPrimary
                                    href={ABOUT_HOLIDAY_BOOKING_PATH}
                                    isIconArrow
                                    className="width-fit-content rounded-pill text-uppercase">
                                    Discuss your property
                                </BtnLinkPrimary>
                            </div>
                        </div>
                    </div>

                    <div className="row gx-5 flex-row-reverse mt-70">
                        <div className="col">
                            <div className="w-100 vstack gap-3 text-grey-200 wp-hover-image">
                                <WrapImageHoverOverlay
                                    className="section-boat-banner-reel"
                                    contentOverlay={null}>
                                    <Image
                                        src={BGHero}
                                        alt="test"
                                        fill
                                        className="object-fit-cover"
                                    />
                                </WrapImageHoverOverlay>
                            </div>
                        </div>
                        <div className="col-md-5 font-tt-drugs color-555">
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
                                        LOCAL EXPERTISE. PROFESSIONAL
                                        MANAGEMENT.
                                    </p>
                                </div>
                                <p className="m-0 fw-light">
                                    Owning an island property should be
                                    rewarding — without having to manage every
                                    detail yourself.
                                </p>
                                <p className="m-0 fw-light">
                                    From day-to-day operations to bookings,
                                    revenue and marketing, The Lembongan
                                    Traveller brings everything together through
                                    one experienced, on-island team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-neutral-100">
                <div className="container">
                    <div className="text-center vstack gap-4 px-5">
                        <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                            What We Do
                        </SectionTitle>
                    </div>

                    <div
                        className="row"
                        style={{
                            marginTop: '70px',
                        }}>
                        <div className="col-md-4">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconHouseHand />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase"
                                    style={{ fontSize: '20px' }}>
                                    Property Management
                                </p>
                                <p className="m-0 fw-light">
                                    Hands-on local management focused on your
                                    property, people and guest experience. 
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconCalendarCheck />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase"
                                    style={{ fontSize: '20px' }}>
                                    Property Management
                                </p>
                                <p className="m-0 fw-light">
                                    Hands-on local management focused on your
                                    property, people and guest experience.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconCoinChart />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase"
                                    style={{ fontSize: '20px' }}>
                                    Property Management
                                </p>
                                <p className="m-0 fw-light">
                                    Hands-on local management focused on your
                                    property, people and guest experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <div className="row mb-90">
                        <div className="col">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light fs-48">
                                MANAGEMENT OPTIONS
                            </SectionTitle>
                        </div>

                        <div className="col-md-5 offset-1">
                            <p className="font-tt-drugs fw-semibold">
                                Management Built Around Your Property
                            </p>
                            <p className="font-tt-drugs">
                                Not every owner needs the same level of support.
                                We offer flexible management solutions based on
                                your property, your team and how involved you
                                want to be.
                            </p>
                        </div>
                    </div>

                    <div className="row gx-5">
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p className="text-uppercase fs-32 m-0">
                                    Full Property Management
                                </p>
                                <p className="m-0 fw-light">
                                    For owners looking for complete operational
                                    and bookings management.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p className="text-uppercase fs-32 m-0">
                                    Booking Management
                                </p>
                                <p className="m-0 fw-light">
                                    For independently operated villas looking to
                                    strengthen bookings and revenue.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p className="text-uppercase fs-32 m-0">
                                    Commercial & Booking Management
                                </p>
                                <p className="m-0 fw-light">
                                    For villa complexes and boutique resorts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small bg-primary text-neutral-100">
                <div className="container">
                    <div className="row mb-90">
                        <div className="col">
                            <SectionTitle className="font-tt-drugs text-uppercase fw-light fs-48 text-neutral-100">
                                Why the lembongan traveler
                            </SectionTitle>
                        </div>

                        <div className="col-md-5 offset-1">
                            <p className="font-tt-drugs">
                                We work exclusively in Nusa Lembongan & Nusa
                                Ceningan. That focus gives owners an experienced
                                local team combined with destination reach,
                                reservations, revenue management and marketing.
                                All working towards the same goal.
                            </p>
                        </div>
                    </div>

                    <div
                        className="row gx-5"
                        style={{
                            marginTop: '70px',
                        }}>
                        <div className="col-md-3">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    className="text-neutral-100"
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconGearUserCheck />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase text-neutral-100"
                                    style={{ fontSize: '20px' }}>
                                    On-Island Team
                                </p>
                                <p className="m-0 fw-light text-neutral-100">
                                    Operations, reservations, finance &
                                    marketing.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    className="text-neutral-100"
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconHandBuilding />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase text-neutral-100"
                                    style={{ fontSize: '20px' }}>
                                    Commercial Expertise
                                </p>
                                <p className="m-0 fw-light text-neutral-100">
                                    Beyond occupancy — focused on sustainable
                                    performance.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    className="text-neutral-100"
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconCheckBoard />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase text-neutral-100"
                                    style={{ fontSize: '20px' }}>
                                    Destination Specialists
                                </p>
                                <p className="m-0 fw-light text-neutral-100">
                                    Focused exclusively on Lembongan & Ceningan.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="text-center color-555 vstack gap-4">
                                <div
                                    className="text-neutral-100"
                                    style={{
                                        height: '100px',
                                    }}>
                                    <IconEarthUser />
                                </div>
                                <p
                                    className="font-tt-drugs m-0 text-uppercase text-neutral-100"
                                    style={{ fontSize: '20px' }}>
                                    Established Reach
                                </p>
                                <p className="m-0 fw-light text-neutral-100">
                                    Connecting travellers with Lembongan since
                                    2013.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <div className="text-center vstack gap-4 px-5">
                        <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                            PEOPLE BEHIND THE LEMBONGAN TRAVELLER
                        </SectionTitle>
                    </div>

                    <div className="row g-5 mt-70">
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p
                                    className="text-uppercase m-0 text-center"
                                    style={{ fontSize: '28px' }}>
                                    founder
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p
                                    className="text-uppercase m-0 text-center"
                                    style={{ fontSize: '28px' }}>
                                    Reservation
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p
                                    className="text-uppercase m-0 text-center"
                                    style={{ fontSize: '28px' }}>
                                    Marketing
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p
                                    className="text-uppercase m-0 text-center"
                                    style={{ fontSize: '28px' }}>
                                    operations
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p
                                    className="text-uppercase m-0 text-center"
                                    style={{ fontSize: '28px' }}>
                                    engineering
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 font-tt-drugs color-555">
                            <div className="vstack gap-4 overflow-hidden">
                                <Image
                                    src={BGHero}
                                    alt="Full Property Management"
                                    width={480}
                                    height={350}
                                    className="object-fit-cover"
                                />
                                <p
                                    className="text-uppercase m-0 text-center"
                                    style={{ fontSize: '28px' }}>
                                    finance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small">
                <div className="container">
                    <div className="text-center vstack gap-4 px-5">
                        <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                            our portfolio
                        </SectionTitle>
                    </div>

                    <div className="mt-70">
                        <SwipeSlideBanner
                            items={[
                                {
                                    buttonLink: '#',
                                    image: BGHero,
                                    title: 'Test',
                                },
                                {
                                    buttonLink: '#',
                                    image: BGHero,
                                    title: 'Test',
                                },
                                {
                                    buttonLink: '#',
                                    image: BGHero,
                                    title: 'Test',
                                },
                            ]}
                            breakpoints={{
                                576: { slidesPerView: 1, spaceBetween: 20 },
                                992: { slidesPerView: 1, spaceBetween: 24 },
                                1200: { slidesPerView: 1, spaceBetween: 24 },
                            }}
                            swiperConfig={{
                                loop: true,
                            }}
                            classNameArrowLeft="absolute-y-middle z-2 start-5 text-white"
                            classNameArrowRight="absolute-y-middle z-2 end-5 text-white"
                            contentElement={(dataElement: any) => (
                                <div className="position-relative">
                                    <Link
                                        className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                        href={dataElement.buttonLink || '#'}>
                                        <WrapImageHoverOverlay
                                            className="section-about-banner-reel"
                                            contentOverlay={null}>
                                            <Image
                                                src={dataElement?.image}
                                                alt={dataElement.title}
                                                fill
                                                className="object-fit-cover"
                                            />
                                        </WrapImageHoverOverlay>
                                    </Link>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 2,
                                        }}>
                                        <div
                                            className="vstack gap-4 justify-content-center text-white text-center h-100 ps-5 font-tt-drugs"
                                            style={{
                                                maxWidth: '380px',
                                            }}>
                                            <p className="mb-0 fs-48 text-uppercase">
                                                Villa
                                            </p>
                                            <p className="m-0 fw-light fs-20">
                                                They founded The Lembongan
                                                Traveller, starting with an
                                                Instagram account to share and
                                                promote the island they had come
                                                to love.{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <div className="hstack justify-content-center mt-70">
                        <BtnLinkPrimary
                            isIconArrow
                            className="rounded-pill text-uppercase">
                            Explore more
                        </BtnLinkPrimary>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUsPropertyManagement
