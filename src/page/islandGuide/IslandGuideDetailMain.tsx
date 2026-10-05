'use client'
import RenderHtml from '@/component/general/RenderHtml'
import {
    CardContactInfoMain,
    PointContactInfo,
} from '@/component/general/CardContactInfo'
import SliderBannerWithTopNav from '@/component/swiperSlide/SliderBannerWithTopNav'
import { BtnLinkPrimary } from '@/component/general/Button'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getListIslandGuide } from '@/service/api/islandGuide.api'

const IslandGuideDetailMain = ({ detail = {} }: { detail?: any }) => {
    const {
        name,
        excerpt,
        description,
        photos = [],
        whatsapp = '',
        instagram = '',
        type = {},
    } = detail || {}

    const { list, isLoading, pagination, _handleChangePage } =
        useGeneralDataList({
            configSearch: {
                page: 1,
                typeId: type?.id || '',
                limit: 2,
            },
            urlAPI: getListIslandGuide,
        })

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="vstack gap-3">
                        {excerpt ? (
                            <div className="row">
                                <div className="col-md-7">
                                    <RenderHtml
                                        className="fs-20 wp-fw-300 text-grey-400"
                                        html={excerpt}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {photos && photos.length ? (
                            <SliderBannerWithTopNav list={photos} />
                        ) : null}

                        <div className="row gx-3 gy-4 justify-content-between">
                            <div className="col-md-7">
                                <p className="fs-32 font-tt-drugs">{name}</p>

                                <RenderHtml
                                    className="fs-16 text-grey-400 wp-fw-300"
                                    html={description}
                                />
                            </div>
                            <div className="col-md-4">
                                <CardContactInfoMain>
                                    <p className="fs-20 font-tt-drugs fw-600 text-grey-200 text-center pt-3">
                                        CONTACT & HIRE
                                    </p>

                                    <div className="px-3 vstack gap-2 py-3">
                                        {whatsapp ? (
                                            <PointContactInfo
                                                label="Whatsapp"
                                                value={whatsapp}
                                            />
                                        ) : null}

                                        {instagram ? (
                                            <PointContactInfo
                                                label="Instagram"
                                                value={instagram}
                                            />
                                        ) : null}
                                    </div>

                                    <hr />

                                    <BtnLinkPrimary
                                        href="#"
                                        className="w-100 rounded-pill my-3">
                                        WHATSAPP
                                    </BtnLinkPrimary>
                                </CardContactInfoMain>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-space-small-bottom bg-neutral-100">
                <div className="container">
                    <div className="wp-font-tt-drugs text-uppercase text-center text-grey-200 pb-4"></div>
                </div>
            </section>
        </>
    )
}

export default IslandGuideDetailMain
