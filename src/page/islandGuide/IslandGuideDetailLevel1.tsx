'use client'
import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroSecondInfo from '@/component/general/SectionHeroSecondInfo'
import RenderHtml from '@/component/general/RenderHtml'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getListIslandGuide } from '@/service/api/islandGuide.api'
import LoadingCardListData from '@/component/loading/LoadingCardListData'
import { isEmpty } from 'lodash'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import Pagination from '@/component/general/Pagination'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import {
    BtnBasic,
    BtnLinkPrimary,
    CodeIconArrow,
} from '@/component/general/Button'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import { usePathname } from 'next/navigation'
import { URL_WHATSAPP } from '@/config/url.config'

const IslandGuideDetailLevel1 = ({ detail = {} }: { detail?: any }) => {
    const pathname = usePathname() || '/'

    const { name, featuredImage, description, excerpt = '', id } = detail || {}

    const { list, isLoading, pagination, _handleChangePage } =
        useGeneralDataList({
            configSearch: {
                page: 1,
                typeId: id,
            },
            urlAPI: getListIslandGuide,
        })

    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecondInfo
                content={{
                    title: name,
                    image: featuredImage,
                }}
            />

            <section className="section-space-small">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {excerpt ? (
                                <RenderHtml
                                    className="wp-font-tt-drugs text-uppercase text-grey-200"
                                    html={excerpt}
                                />
                            ) : null}
                        </div>

                        <div className="col-md-6">
                            <RenderHtml
                                className="fs-20 text-grey-400"
                                html={description}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <LoadingCardListData />
                    ) : !isEmpty(list) ? (
                        <>
                            <div className="row g-5 pt-5 mb-5">
                                {list.map((vm: any, index: number) => {
                                    const { slug } = vm?.seo || {}

                                    console.log('description: ', description)

                                    return (
                                        <div key={index} className="col-lg-4">
                                            <div
                                                className="w-100 h-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden property-card-slider"
                                                // href={slug ? pathname + '/' + slug : '#'}
                                            >
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

                                                <div className="hstack gap-3 mt-auto">
                                                    <BtnLinkPrimary
                                                        isOutline
                                                        className="rounded-pill flex-fill"
                                                        href={
                                                            slug
                                                                ? pathname +
                                                                  '/' +
                                                                  slug
                                                                : '#'
                                                        }>
                                                        MORE DETAILS
                                                    </BtnLinkPrimary>

                                                    {vm.whatsapp ? (
                                                        <BtnLinkPrimary
                                                            target="_blank"
                                                            className="rounded-pill flex-fill"
                                                            href={URL_WHATSAPP(
                                                                vm.whatsapp,
                                                            )}>
                                                            WHATSAPP
                                                        </BtnLinkPrimary>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="py-4">
                                <Pagination
                                    // @ts-ignore
                                    pagination={pagination}
                                    onPageChange={(passPage) =>
                                        _handleChangePage(passPage)
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <InfoNotAvailable />
                    )}
                </div>
            </section>

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default IslandGuideDetailLevel1
