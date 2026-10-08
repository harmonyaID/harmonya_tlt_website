'use client'
import RenderHtml from '@/component/general/RenderHtml'
import {
    CardContactInfoMain,
    PointContactInfo,
} from '@/component/general/CardContactInfo'
import SliderBannerWithTopNav from '@/component/swiperSlide/SliderBannerWithTopNav'
import {
    BtnBasic,
    BtnLinkPrimary,
    CodeIconArrow,
} from '@/component/general/Button'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getListIslandGuide } from '@/service/api/islandGuide.api'
import LoadingCardListData from '@/component/loading/LoadingCardListData'
import { isEmpty } from 'lodash'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import { URL_WHATSAPP } from '@/config/url.config'
import Pagination from '@/component/general/Pagination'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import Link from 'next/link'

const IslandGuideDetailMain = ({
    detail = {},
    allSlug = [],
}: {
    detail?: any
    allSlug?: any[]
}) => {
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

                                    {whatsapp ? (
                                        <>
                                            <hr />

                                            <BtnLinkPrimary
                                                href={URL_WHATSAPP(whatsapp)}
                                                target="_blank"
                                                className="w-100 rounded-pill my-3">
                                                WHATSAPP
                                            </BtnLinkPrimary>
                                        </>
                                    ) : null}
                                </CardContactInfoMain>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-neutral-100">
                <div className="container">
                    <p className="wp-font-tt-drugs fs-40 mb-0 text-uppercase text-center text-grey-200 pb-4">
                        DISCOVER OTHER TRANSPORT
                    </p>

                    {isLoading ? (
                        <LoadingCardListData />
                    ) : !isEmpty(list) ? (
                        <>
                            <div className="row justify-content-center g-5">
                                {list.map((vm: any, index: number) => {
                                    const { slug } = vm?.seo || {}

                                    console.log('description: ', description)

                                    return (
                                        <div key={index} className="col-lg-4">
                                            <Link
                                                className="w-100 h-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden property-card-slider"
                                                href={
                                                    slug
                                                        ? '/' +
                                                          allSlug[0] +
                                                          '/' +
                                                          allSlug[1] +
                                                          '/' +
                                                          slug
                                                        : '#'
                                                }>
                                                <WrapImageHoverOverlay
                                                    className="img-h-332px overflow-hidden"
                                                    contentOverlay={
                                                        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                                            <BtnBasic className="btn-outline-white rounded-pill">
                                                                <div className="hstack align-items-center gap-1">
                                                                    Explore{' '}
                                                                    <CodeIconArrow />
                                                                </div>
                                                            </BtnBasic>
                                                        </div>
                                                    }>
                                                    <Image
                                                        src={imgReelConfig(
                                                            vm?.thumbnail,
                                                        )}
                                                        alt={
                                                            vm.name ||
                                                            'experience'
                                                        }
                                                        fill
                                                        className="object-fit-cover"
                                                    />
                                                </WrapImageHoverOverlay>

                                                <div className="vstack gap-3">
                                                    <p className="fs-20 mb-1 font-tt-drugs text-uppercase desc-two-line">
                                                        {vm.name || ''}
                                                    </p>

                                                    {vm?.description ? (
                                                        <p className="fs-16 fw-400 desc-two-line">
                                                            {vm?.description ||
                                                                ''}
                                                        </p>
                                                    ) : null}
                                                </div>

                                                {/*<div className="hstack gap-3 mt-auto">*/}
                                                {/*    <BtnLinkPrimary*/}
                                                {/*        isOutline*/}
                                                {/*        className="rounded-pill flex-fill"*/}
                                                {/*        href={*/}
                                                {/*            slug*/}
                                                {/*                ? pathname +*/}
                                                {/*                  '/' +*/}
                                                {/*                  slug*/}
                                                {/*                : '#'*/}
                                                {/*        }>*/}
                                                {/*        MORE DETAILS*/}
                                                {/*    </BtnLinkPrimary>*/}

                                                {/*    {vm.whatsapp ? (*/}
                                                {/*        <BtnLinkPrimary*/}
                                                {/*            target="_blank"*/}
                                                {/*            className="rounded-pill flex-fill"*/}
                                                {/*            href={URL_WHATSAPP(*/}
                                                {/*                vm.whatsapp,*/}
                                                {/*            )}>*/}
                                                {/*            WHATSAPP*/}
                                                {/*        </BtnLinkPrimary>*/}
                                                {/*    ) : null}*/}
                                                {/*</div>*/}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <InfoNotAvailable />
                    )}
                </div>
            </section>
        </>
    )
}

export default IslandGuideDetailMain
