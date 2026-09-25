'use client'
import RenderHtml from '@/component/general/RenderHtml'
import { usePathname } from 'next/navigation'
import useExpListHook from '@/page/experience/hook/useExpList.hook'
import ExpLoadingList from '@/page/experience/component/ExpLoadingList'
import { isEmpty } from 'lodash'
import { slugify } from '@/helper/slugify.helper'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import Pagination from '@/component/general/Pagination'
import InfoNotAvailable from '@/component/general/InfoEmpty'

const ExpOtherList = ({
    title,
    configSearch = {},
    isOnlyPathname = false,
    basePath = '',
}: {
    title?: string
    className?: string
    configSearch?: object
    isOnlyPathname?: boolean
    basePath?: string
}) => {
    const pathname = usePathname() || '/'

    const { list, isLoading, pagination, _handleChangePage } = useExpListHook({
        configSearch,
    })

    return (
        <>
            <section className="section-space-small-bottom">
                <div className="container">
                    <RenderHtml
                        className="wp-font-tt-drugs text-uppercase text-center text-grey-200 pb-4"
                        html={'<h3>' + title + '</h3>'}
                    />

                    {isLoading ? (
                        <ExpLoadingList />
                    ) : !isEmpty(list) ? (
                        <>
                            <div className="row gy-5">
                                {list.map((vm: any, index: number) => {
                                    const { slug } = vm?.seo || {}
                                    const { name } = vm?.area || {}

                                    const href = basePath
                                        ? basePath + '/' + slug
                                        : isOnlyPathname
                                          ? pathname + '/' + slug
                                          : slug && name
                                            ? pathname +
                                              '/' +
                                              slugify(name) +
                                              '/' +
                                              slug
                                            : slug
                                              ? pathname + '/' + slug
                                              : '#'

                                    return (
                                        <div
                                            key={index}
                                            className="col-lg-4 col-md-6">
                                            <Link
                                                className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden property-card-slider"
                                                href={href}>
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
                                                            vm?.thumbnail ||
                                                                PropertyVilla01,
                                                        )}
                                                        alt={
                                                            vm.name ||
                                                            'experience'
                                                        }
                                                        fill
                                                        className="object-fit-cover"
                                                    />
                                                </WrapImageHoverOverlay>

                                                <div className="">
                                                    <p className="fs-24 mb-1 font-tt-drugs text-uppercase desc-two-line">
                                                        {vm.name || ''}
                                                    </p>
                                                </div>
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

export default ExpOtherList
