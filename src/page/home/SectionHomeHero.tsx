'use client'
import Image from 'next/image'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import FormRangeDatepicker from '@/component/form/FormRangeDatepicker'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import usePropertyHeroSearch from '@/page/property/hook/usePropertyHeroSearch'

const SectionHomeHero = ({ content = {} }: { content?: any | {} }) => {
    const { formSearch, _handleChange } = usePropertyHeroSearch()

    return (
        <section className="section-hero-general bg-green-800">
            <div className="general-hero-full-screen">
                <Image
                    src={imgLandscapeConfig(content.videoThumbnail)}
                    className="h-100 banner-image"
                    alt="The Lembongan Traveller - Your Guide to Nusa Lembongan"
                    fill
                />
            </div>

            {/*Title*/}
            <div className="container content-hero-position-default text-center z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-9 text-white">
                        <div
                            className="wp-font-tt-drugs wp-fw-300"
                            dangerouslySetInnerHTML={{
                                __html:
                                    content?.content ||
                                    '<h1>Your Nusa Lembongan Story Starts Here</h1>',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/*Search*/}
            <div className="container content-hero-position-bottom z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="content-hero-search-card text-white py-3 px-4 rounded-3">
                            <FormWrap actions={{ handleSubmit: () => {} }}>
                                <WrapFormContext
                                    formRequest={formSearch}
                                    actions={{ change: _handleChange }}>
                                    <div className="row align-items-end g-4">
                                        <div className="col-md">
                                            <div className="">
                                                <label
                                                    htmlFor="inputDates"
                                                    className="form-label fw-500">
                                                    {content.searchLabelDates ||
                                                        'DATES'}
                                                </label>
                                                {/*<input*/}
                                                {/*    type="text"*/}
                                                {/*    className="form-control form-transparent-underline"*/}
                                                {/*    id="inputDates"*/}
                                                {/*    placeholder={*/}
                                                {/*        content.searchPlaceholderDates ||*/}
                                                {/*        'e.g name'*/}
                                                {/*    }*/}
                                                {/*/>*/}

                                                <FormRangeDatepicker
                                                    className="form-property"
                                                    id="inputDates"
                                                    config={{
                                                        format: 'dd M yyyy',
                                                    }}
                                                    classInput="form-transparent-underline px-2"
                                                    isIconArrow
                                                    placeholderFrom="Check-In"
                                                    placeholderTo="Check-Out"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="">
                                                <label
                                                    htmlFor="inputDates"
                                                    className="form-label fw-500">
                                                    {content.searchLabelGuest ||
                                                        'GUEST'}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-transparent-underline"
                                                    id="inputDates"
                                                    placeholder={
                                                        content.searchPlaceholderGuest ||
                                                        'e.g name'
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="">
                                                <label
                                                    htmlFor="selectCollction"
                                                    className="form-label fw-500">
                                                    {content?.searchLabelCollection ||
                                                        'COLLECTIONS'}
                                                </label>
                                                {/*<input*/}
                                                {/*    type="text"*/}
                                                {/*    className="form-control form-transparent-underline"*/}
                                                {/*    id="inputDates"*/}
                                                {/*    placeholder={*/}
                                                {/*        content?.searchPlaceholderCollection ||*/}
                                                {/*        'e.g Placeholder'*/}
                                                {/*    }*/}
                                                {/*/>*/}
                                                <select
                                                    name=""
                                                    id="selectCollction"
                                                    className="form-control form-transparent-underline">
                                                    <option value="">
                                                        {content?.searchPlaceholderCollection ||
                                                            'e.g Placeholder'}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <BtnLinkPrimary
                                                type="button"
                                                href={
                                                    content?.buttonLink || '#'
                                                }
                                                className="rounded-pill">
                                                {content?.buttonText ||
                                                    'SEARCH'}
                                            </BtnLinkPrimary>
                                        </div>
                                    </div>
                                </WrapFormContext>
                            </FormWrap>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionHomeHero
