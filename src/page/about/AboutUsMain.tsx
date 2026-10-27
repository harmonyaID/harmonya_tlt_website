'use client'

import { SectionTitle } from '@/component/text/Heading'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import {
    BtnBasic,
    BtnLinkPrimary,
    BtnPrimary,
    CodeIconArrow,
} from '@/component/general/Button'
import Image from 'next/image'

const AboutUsMain = ({
    SECTION2,
    SECTION3,
    SECTION4,
}: {
    SECTION2: any
    SECTION3: any
    SECTION4: any
}) => {
    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="text-center vstack gap-4 px-5">
                        <SectionTitle className="font-tt-drugs text-uppercase fw-light">
                            our story
                        </SectionTitle>
                        <p className="font-tt-drugs fw-light">
                            The Walker family has been returning to Nusa
                            Lembongan for their annual holidays since the early
                            2000s.. What began as a holiday tradition grew into
                            something more for Tania and Mal Walker. They fell
                            in love with the island’s crystal-clear waters,
                            close-knit community and village way of life and
                            wanted to find a way to stay connected while helping
                            others experience Lembongan too.
                        </p>
                        <p className="font-tt-drugs fw-light">
                            In 2013, that idea became The Lembongan Traveller a
                            platform created to share the island we loved,
                            support local businesses and make it easier for
                            travellers to experience Nusa Lembongan.
                        </p>
                    </div>
                </div>

                <div className="container-fluid mt-70 px-5">
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
                                                alt={dataElement.title}
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
                                        <p className="mb-0 fs-48">2013</p>
                                        <p className="m-0 fw-light">
                                            They founded The Lembongan
                                            Traveller, starting with an
                                            Instagram account to share and
                                            promote the island they had come to
                                            love.{' '}
                                        </p>
                                        <p className="m-0 fw-light">
                                            Initially run by just three people
                                            from a home office in Western
                                            Australia, we slowly began helping
                                            friends, family and fellow
                                            travellers discover this little
                                            island paradise.
                                        </p>
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
                                WHAT WE DO
                            </SectionTitle>
                        </div>

                        <div className="col offset-1">
                            <p className="font-tt-drugs fw-light">
                                For more than a decade, we’ve been helping
                                guests find the best Nusa Lembongan
                                accommodation, arrange boat transfers, and
                                discover local experiences. <br /> We also
                                provide property management for villa owners who
                                want a reliable team on the ground, and help
                                local businesses reach a wider audience through
                                our website and social media.
                            </p>
                        </div>
                    </div>

                    <div className="mt-70">
                        <div className="row g-5">
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
                                <div className="vstack gap-3 justify-content-center h-100 px-5">
                                    <div>
                                        <p
                                            className="m-0 mb-2 fs-48 text-uppercase"
                                            style={{
                                                lineHeight: '100%',
                                            }}>
                                            Holiday Booking
                                        </p>
                                        <p className="m-0 fs-24 text-uppercase">
                                            YOUR ISLAND GUIDE
                                        </p>
                                    </div>
                                    <p className="m-0 fw-light">
                                        From finding the right Nusa Lembongan
                                        accommodation to arranging your boat
                                        transfer, we make planning your island
                                        stay simple.
                                    </p>
                                    <p className="m-0 fw-light">
                                        With local knowledge, personalised
                                        recommendations and accommodation
                                        options for every style and budget, we
                                        help you plan a trip that suits you.
                                    </p>
                                    <p className="m-0 fw-light">
                                        And once you arrive, our on-island team
                                        is just one message away.
                                    </p>

                                    <p className="fw-medium">
                                        We make Lembongan holidays easy
                                    </p>

                                    <BtnLinkPrimary
                                        href="#"
                                        isIconArrow
                                        className="width-fit-content rounded-pill text-uppercase">
                                        Book a stay
                                    </BtnLinkPrimary>
                                </div>
                            </div>
                        </div>

                        <div className="row g-5 flex-row-reverse mt-70">
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
                                <div className="vstack gap-3 justify-content-center h-100 pe-5">
                                    <div>
                                        <p
                                            className="m-0 mb-2 fs-48 text-uppercase"
                                            style={{
                                                lineHeight: '100%',
                                            }}>
                                            PROPERTY MANAGEMENT
                                        </p>
                                        <p className="m-0 fs-24 text-uppercase">
                                            Your Property, Our Priority
                                        </p>
                                    </div>
                                    <p className="m-0 fw-light">
                                        <span className="fw-medium">
                                            Do you own a property or are you
                                            thinking of building one?
                                        </span>{' '}
                                        Let our experienced island team take
                                        care of the day-to-day, so you can enjoy
                                        the benefits of owning a holiday home
                                        without the stress of managing it
                                        yourself.
                                    </p>
                                    <p className="m-0 fw-light">
                                        From operations and guest experience to
                                        marketing and revenue management, we
                                        combine local expertise, a trusted
                                        network of vendors, a loyal customer
                                        base and smart technology to help your
                                        property perform at its best.
                                    </p>

                                    <BtnLinkPrimary
                                        href="#"
                                        isIconArrow
                                        className="width-fit-content rounded-pill text-uppercase">
                                        DISCUSS YOUR PROPERTY
                                    </BtnLinkPrimary>
                                </div>
                            </div>
                        </div>

                        <div className="row g-5 mt-70">
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
                                <div className="vstack gap-3 justify-content-center h-100 ps-5">
                                    <div>
                                        <p
                                            className="m-0 mb-2 fs-48 text-uppercase"
                                            style={{
                                                lineHeight: '100%',
                                            }}>
                                            Business Listing
                                        </p>
                                        <p className="m-0 fs-24 text-uppercase">
                                            REACH MORE TRAVELLERS
                                        </p>
                                    </div>
                                    <p className="m-0 fw-light">
                                        Put your business in front of travellers
                                        already planning their trip to Nusa
                                        Lembongan and Nusa Ceningan.
                                    </p>
                                    <p className="m-0 fw-light">
                                        With a strong online presence, a
                                        well-established website and an engaged
                                        Instagram and Facebook community, we
                                        connect businesses with travellers
                                        actively looking for places to eat,
                                        things to do and services on the
                                        islands.
                                    </p>
                                    <p className="fw-medium">
                                        Get your business in front of travellers
                                        before they arrive.
                                    </p>
                                    <p className="m-0 fw-light">
                                        Our platform connects you with people
                                        actively planning where to eat, what to
                                        do and which services to book.
                                    </p>

                                    <BtnLinkPrimary
                                        href="#"
                                        isIconArrow
                                        className="width-fit-content rounded-pill text-uppercase">
                                        List with us
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
                            MEET the team
                        </SectionTitle>
                        <p className="font-tt-drugs fw-light">
                            Meet the faces behind The Lembongan Traveller and
                            get to know the people behind your island holiday.
                            From why they love calling Lembongan home to their
                            favourite places to eat, explore and unwind,
                            discover the island through the eyes of our team.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUsMain
