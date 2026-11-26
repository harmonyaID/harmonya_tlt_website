'use client'
import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'
import PropertySliderAndGallery from '@/page/property/container/PropertySliderAndGallery'
import { CardContactInfoMain } from '@/component/general/CardContactInfo'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { CheckCircle, ArrowRight, MapPin } from 'feather-icons-react'
import Image from 'next/image'
import PropertyThingsToExplore from '@/page/property/container/PropertyThingsToExplore'
import PropertyOther from '@/page/property/container/PropertyOther'
import PropertyFormInquiry from '@/page/property/container/PropertyFormInquiry'
import PropertyInfoWhyYouLoveThis from '@/page/property/component/PropertyInfoWhyYouLoveThis'
import usePropertyAccommodation from '@/page/property/hook/usePropertyAccommodation'
import PropertyVariantBooking from '@/page/propertyVariant/container/PropertyVariantBooking'
import ValidImage from '@/component/general/ValidImage'
import AvailabilityCalendar from '@/component/general/AvailabilityCalendar'
import usePropertyAvailabilityCalendar from '@/page/property/hook/usePropertyAvailabilityCalendar'
import useLocationCoordinate from '@/hook/useLocationCoordinate.hook'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getPropertyReview } from '@/service/api/property.api'
import { URL_GOOGLE_MAPS_DIRECTION } from '@/config/url.config'
import PropertyAccommodation from '@/page/property/component/PropertyAccommodation'
import PropertyFeatureList from '@/page/property/component/PropertyFeatureList'
import PropertyReviewSlider from '@/page/property/component/PropertyReviewSlider'
import PropertySectionTab from '@/page/property/component/PropertySectionTab'
import PropertyVariantBookingBookeasy from '@/page/propertyVariant/container/PropertyVariantBookingBookeasy'
import {
    SOURCE_TYPE_BOOKEASY_ID,
    SOURCE_TYPE_GUESTY_ID,
} from '@/config/property.config'

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
    // console.log('propertyDetail: ', detail)
    //
    // console.log('description: ', detail.descriptions)

    const {
        amenities = [],
        features = [],
        floorplanImage = '',
        whyYoullLoveThis = [],
        seo = {},
        id,
    } = detail

    const { hasLocation, mapEmbedUrl, latitude, longitude } =
        useLocationCoordinate(detail?.addresses?.[0])
    const locationAddress = detail?.addresses?.[0]?.address

    const { list: accommodations, isLoading: isLoadingAccommodation } =
        usePropertyAccommodation(id)

    const { calendar: availabilityCalendar, fetchCalendar } =
        usePropertyAvailabilityCalendar(detail?.guestyId || '')

    const { list: reviews, isLoading: isLoadingReviews } = useGeneralDataList({
        urlAPI: () => getPropertyReview(id),
    })

    const hasFinePrint = !!detail?.descriptions?.[1]?.summary
    const hasReviews = !isLoadingReviews && reviews && reviews.length > 0

    // hanya tampilkan tab untuk section yang ada datanya
    const sectionTabs = [
        { id: 'property-features', label: 'Features', show: features?.length },
        {
            id: 'property-amenities',
            label: 'Amenities & Service',
            show: amenities?.length,
        },
        {
            id: 'property-floor-plan',
            label: 'Floor Plan',
            show: floorplanImage,
        },
        { id: 'property-availability', label: 'Availability', show: true },
        {
            id: 'property-accommodation',
            label: 'Accommodation',
            show: isLoadingAccommodation || accommodations.length,
        },
        {
            id: 'property-why-you-love-this',
            label: 'Why You’ll Love This',
            show: whyYoullLoveThis?.length,
        },
        { id: 'property-fine-print', label: 'Fine Print', show: hasFinePrint },
        { id: 'property-location', label: 'Location', show: hasLocation },
        { id: 'property-reviews', label: 'Reviews', show: hasReviews },
    ]
        .filter((tab) => !!tab.show)
        .map(({ id, label }) => ({ id, label }))

    const BookingForm = {
        [SOURCE_TYPE_BOOKEASY_ID]: (
            <PropertyVariantBookingBookeasy propertyVariant={detail} />
        ),
        [SOURCE_TYPE_GUESTY_ID]: (
            <PropertyVariantBooking propertyVariant={detail} />
        ),
    }

    return (
        <>
            {/*Slider*/}
            <section className="w-100 py-4">
                <PropertySliderAndGallery
                    photos={detail.photos}
                    title={detail?.nickname}
                />
            </section>

            {/*Section Tab*/}
            <PropertySectionTab tabs={sectionTabs} />

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
                                        {detail?.nickname}
                                    </h1>

                                    {/*<SectionDescription>*/}
                                    {/*    {detail?.descriptions[0]?.summary}*/}
                                    {/*</SectionDescription>*/}
                                    <RenderHtml
                                        html={
                                            detail?.descriptions?.[0]?.summary
                                        }
                                        className="text-grey-400"
                                    />
                                </div>

                                {features && features.length ? (
                                    <>
                                        <hr />

                                        <div id="property-features">
                                            <TitleSection title="Features" />

                                            <PropertyFeatureList
                                                features={features}
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {amenities && amenities.length > 0 ? (
                                    <>
                                        <hr />
                                        <div id="property-amenities">
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
                                                                    {vm.icon ? (
                                                                        <div className="position-relative ratio ratio-4x3 box-40">
                                                                            <Image
                                                                                src={
                                                                                    vm.icon
                                                                                }
                                                                                alt={
                                                                                    vm.name ||
                                                                                    'Property TLT'
                                                                                }
                                                                                fill
                                                                                className="w-100 h-100"
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <CheckCircle
                                                                            size="24"
                                                                            strokeWidth="2"
                                                                        />
                                                                    )}
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
                                        <div id="property-floor-plan">
                                            <TitleSection title="Floor Plan" />
                                            {/*Floor Plan*/}
                                            <div className="w-100 h-320-px position-relative overflow-hidden">
                                                <ValidImage
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
                                <div id="property-availability">
                                    <TitleSection title="Availability" />
                                    {/*Availability*/}
                                    <AvailabilityCalendar
                                        availability={detail?.availability}
                                        calendar={availabilityCalendar}
                                        onMonthChange={fetchCalendar}
                                    />
                                </div>

                                {isLoadingAccommodation ||
                                accommodations.length ? (
                                    <>
                                        <hr />
                                        <div id="property-accommodation">
                                            <TitleSection title="ACCOMMODATION" />
                                            {/*ACCOMMODATION*/}
                                            <PropertyAccommodation
                                                list={accommodations}
                                                isLoading={
                                                    isLoadingAccommodation
                                                }
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {whyYoullLoveThis && whyYoullLoveThis.length ? (
                                    <>
                                        <hr />
                                        <div id="property-why-you-love-this">
                                            <TitleSection title="Why you’ll love this" />
                                            {/*Why you’ll love this*/}
                                            <PropertyInfoWhyYouLoveThis
                                                list={whyYoullLoveThis}
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {detail?.descriptions &&
                                detail?.descriptions?.[1] &&
                                detail?.descriptions?.[1]?.summary ? (
                                    <>
                                        <hr />
                                        <div id="property-fine-print">
                                            <TitleSection title="Fine Print" />
                                            {/*Fine Print*/}

                                            <RenderHtml
                                                html={
                                                    detail?.descriptions?.[1]
                                                        ?.summary
                                                }
                                                className="text-grey-400"
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {hasLocation ? (
                                    <>
                                        <hr />
                                        <div id="property-location">
                                            <TitleSection title="Location" />
                                            {/*Location*/}
                                            <div className="d-flex justify-content-between align-items-start gap-3 pt-3 pb-4">
                                                <div className="hstack gap-2 align-items-start text-grey-300">
                                                    <MapPin
                                                        size="20"
                                                        className="flex-shrink-0 mt-1"
                                                    />
                                                    <p className="fs-20 mb-0">
                                                        {locationAddress}
                                                    </p>
                                                </div>

                                                <a
                                                    href={URL_GOOGLE_MAPS_DIRECTION(
                                                        latitude ?? '',
                                                        longitude ?? '',
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="fs-20 text-grey-300 text-uppercase text-decoration-none border-bottom text-nowrap">
                                                    Get Direction
                                                </a>
                                            </div>

                                            <div className="ratio ratio-16x9">
                                                <iframe
                                                    src={mapEmbedUrl}
                                                    title={
                                                        detail?.nickname ||
                                                        'Property location'
                                                    }
                                                    className="border-0"
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                                {!isLoadingReviews &&
                                reviews &&
                                reviews.length > 0 ? (
                                    <>
                                        <hr />
                                        {/*REVIEWS*/}
                                        <div id="property-reviews">
                                            <PropertyReviewSlider
                                                reviews={reviews}
                                            />
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-md-4">
                            {/*<div className="p-4 border border-neutral-200 rounded-4">*/}
                            {/*    <p className="fs-18 font-tt-drugs fw-600 text-grey-200 pt-3">*/}
                            {/*        SEARCH AVAILABLE DATE*/}
                            {/*    </p>*/}

                            {/*    <hr />*/}

                            {/*    <div className="row g-2">*/}
                            {/*        <div className="col-lg-6 col-md-12">*/}
                            {/*            <BtnPrimary className="rounded-pill w-100">*/}
                            {/*                SHARE*/}
                            {/*            </BtnPrimary>*/}
                            {/*        </div>*/}
                            {/*        <div className="col-lg-6 col-md-12">*/}
                            {/*            <BtnPrimary*/}
                            {/*                className="rounded-pill w-100"*/}
                            {/*                isOutline>*/}
                            {/*                ASK QUESTION*/}
                            {/*            </BtnPrimary>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {BookingForm[detail?.sourceType?.id]}
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
