'use client'
import Breadcrumb from '@/component/general/Breadcrumb'
import { SectionDescription } from '@/component/text/Paragraph'
import RenderHtml from '@/component/general/RenderHtml'
import PropertySliderAndGallery from '@/page/property/container/PropertySliderAndGallery'

const TitleSection = ({ title }: { title: string }) => (
    <>
        <p className="fs-32 text-grey-200 text-uppercase text-grey-200">
            {title}
        </p>
    </>
)

const PropertyDetail = ({ detail = {} }: { detail?: any }) => {
    console.log('propertyDetail: ', detail)

    console.log('description: ', detail.descriptions)

    return (
        <>
            {/*Slider*/}
            <section className="w-100 py-4">
                <PropertySliderAndGallery photos={detail.photos} />
            </section>

            {/*Information*/}
            <section className="py-4">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-7 ">
                            <div className="py-3">
                                <Breadcrumb isLabelHome />
                            </div>

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

                                <hr />
                                <div className="">
                                    <TitleSection title="AMENITIES & Services" />
                                    {/*AMENITIES & Services*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="Floor Plan" />
                                    {/*AMENITIES & Services*/}
                                </div>

                                <hr />
                                <div className="">
                                    <TitleSection title="Availability" />
                                    {/*AMENITIES & Services*/}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4"></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PropertyDetail
