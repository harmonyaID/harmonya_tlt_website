'use client'
import { IMAGE_EMPTY } from '@/config/asset.config'
import Image from 'next/image'
import RenderHtml from '@/component/general/RenderHtml'
import { H1 } from '@/component/text/Heading'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper'
import { BadgeRow } from '@/component/general/Badge'
import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import BlogListSideRight from '@/page/blog/BlogListSideRight'
import { isEmpty } from 'lodash'
import Breadcrumb from '@/component/general/Breadcrumb'
import ShareBlog from '@/component/general/ShareBlog'
import { useState, useEffect } from 'react'

const SectionContent = ({
    children,
    className = '',
}: {
    children?: ReactNode
    className?: string
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'pb-5 mb-5 text-grey-400 border-bottom border-neutral-100',
                className,
            )}>
            {children}
        </div>
    )
}

const SectionBlogDetail = ({ detail = {} }: { detail?: any }) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        setUrl(window.location.href)
    }, [detail?.title])

    return (
        <section className="container py-3 py-md-5 position-relative overflow-hidden">
            <div className="section-blog-detail-banner-main overflow-hidden">
                <Image
                    src={detail?.thumbnail || IMAGE_EMPTY}
                    alt={detail.title}
                    className="object-fit-cover"
                    fill
                />
            </div>

            <div className="pt-4">
                <Breadcrumb />
            </div>

            <div className="row pt-5 gx-0 gy-4 section-space-small justify-content-between">
                <div className="col-md-8 wp-content-blog">
                    {!isEmpty(detail) ? (
                        <>
                            <SectionContent>
                                {detail?.publishedAt ? (
                                    <p className="fs-16 mb-4 font-tt-drugs">
                                        {formatDateTimeByTlt(
                                            detail.publishedAt,
                                        )}
                                    </p>
                                ) : null}
                                <H1 className="fs-48 pb-3">{detail.title}</H1>

                                {detail?.tags ? (
                                    <BadgeRow badges={detail.tags} />
                                ) : null}
                            </SectionContent>
                        </>
                    ) : null}

                    {detail?.excerpt ? (
                        <SectionContent>
                            <RenderHtml
                                className="render-content"
                                html={detail.excerpt}
                            />
                        </SectionContent>
                    ) : null}

                    {detail?.content ? (
                        <>
                            <SectionContent>
                                <RenderHtml
                                    className="render-content"
                                    html={detail?.content || ''}
                                />
                            </SectionContent>

                            <div className="row gx-3 gy-4 align-items-center justify-content-between text-grey-500">
                                <div className="col-md-6">
                                    <p className="fs-32 font-tt-drugs mb-0">
                                        LIKE THIS ARTICLE ?
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    {/*<div className="hstack flex-wrap gap-2">*/}
                                    {/*    <p className="mb-0 fs-20 font-tt-drugs mb-0">*/}
                                    {/*        Share:*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}

                                    <ShareBlog url={url} />
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>

                <div className="col-md-3">
                    <BlogListSideRight />
                </div>
            </div>
        </section>
    )
}

export default SectionBlogDetail
