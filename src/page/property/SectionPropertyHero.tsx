'use client'

import Image from 'next/image'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import FormRangeDatepicker from '@/component/form/FormRangeDatepicker'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import usePropertyHeroSearch from '@/page/property/hook/usePropertyHeroSearch'
import PropertyFormSelectTreeOption from '@/page/property/component/PropertyFormSelectColection'

const SectionPropertyHero = ({ content = {} }: { content?: any | {} }) => {
    const { formSearch, _handleChange } = usePropertyHeroSearch()

    return (
        <>
            <section className="section-hero-general bg-green-800">
                <div className="general-hero-full-screen">
                    <Image
                        src={imgLandscapeConfig(content.backgroundImage)}
                        // className="object-fit-cover w-100 h-100"
                        className="h-100 banner-image"
                        alt="The lembongan traveller villa bali"
                        fill
                    />
                </div>

                {/*Title*/}
                <div className="container content-hero-position-defaultP content-hero-data-text-center text-center z-1">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 text-white">
                            <div
                                className="wp-font-tt-drugs wp-fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: content?.content || '',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/*Search*/}
                <div className="container content-hero-position-bottom z-1">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="content-hero-search-cardP bg-white py-3 px-4 rounded-3">
                                <FormWrap actions={{ handleSubmit: () => {} }}>
                                    <WrapFormContext
                                        formRequest={formSearch}
                                        actions={{ change: _handleChange }}>
                                        <div className="row align-items-end g-3">
                                            <div className="col-md">
                                                <div className="">
                                                    <label
                                                        htmlFor="inputDates"
                                                        className="form-label font-tt-drugs fw-500">
                                                        {content.searchLabelDates ||
                                                            'DATES'}
                                                    </label>
                                                    {/*<input*/}
                                                    {/*    type="text"*/}
                                                    {/*    className="form-control form-transparent-underline-black"*/}
                                                    {/*    id="inputDates"*/}
                                                    {/*    placeholder="e.g check-in → check-out"*/}
                                                    {/*/>*/}

                                                    <FormRangeDatepicker
                                                        className="form-property"
                                                        id="inputDates"
                                                        config={{
                                                            format: 'dd M yyyy',
                                                        }}
                                                        isIconArrow
                                                        placeholderFrom="Check-In"
                                                        placeholderTo="Check-Out"
                                                        startName="fromDate"
                                                        endName="toDate"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md">
                                                <div className="">
                                                    <label
                                                        htmlFor="inputGues"
                                                        className="form-label font-tt-drugs fw-500">
                                                        {content.searchLabelGuest ||
                                                            'COLLECTIONS'}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-transparent-underline-black"
                                                        id="inputGues"
                                                        name="gues"
                                                        placeholder="e.g 2 Adults, 0 Children"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md">
                                                <div className="">
                                                    <label
                                                        htmlFor="selectCollction"
                                                        className="form-label font-tt-drugs fw-500">
                                                        COLLECTIONS
                                                    </label>
                                                    {/*<select*/}
                                                    {/*    name=""*/}
                                                    {/*    id="selectCollction"*/}
                                                    {/*    className="form-control form-transparent-underline-black">*/}
                                                    {/*    <option value="">*/}
                                                    {/*        {content?.searchPlaceholderCollection ||*/}
                                                    {/*            'e.g Choose your preferences'}*/}
                                                    {/*    </option>*/}
                                                    {/*</select>*/}

                                                    <PropertyFormSelectTreeOption
                                                        name="typeId"
                                                        classNameSelect="form-control form-transparent-underline-black"
                                                        placeholder={
                                                            content?.searchPlaceholderCollection ||
                                                            'Collection'
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-auto">
                                                <BtnLinkPrimary
                                                    type="button"
                                                    href={
                                                        content?.buttonLink ||
                                                        '#'
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
        </>
    )
}

export default SectionPropertyHero
