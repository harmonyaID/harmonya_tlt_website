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
    return (
        <section className="container py-3 py-md-5">
            <div className="section-blog-detail-banner-main">
                <Image
                    src={detail?.thumbnail || IMAGE_EMPTY}
                    alt={detail.title}
                    fill
                />
            </div>

            <div className="row pt-5 gx-0 gy-4 justify-content-between">
                <div className="col-md-8 wp-content-blog">
                    <SectionContent>
                        {detail?.publishedAt ? (
                            <p className="fs-16 mb-4 font-tt-drugs">
                                {formatDateTimeByTlt(detail.publishedAt)}
                            </p>
                        ) : null}
                        <H1 className="fs-48 pb-3">{detail.title}</H1>

                        {detail?.tags ? (
                            <BadgeRow badges={detail.tags} />
                        ) : null}
                    </SectionContent>

                    <SectionContent>
                        <RenderHtml
                            className="render-content"
                            html={detail.excerpt}
                        />
                    </SectionContent>

                    <RenderHtml
                        className="render-content"
                        html={detail?.content || ''}
                    />
                </div>

                <div className="col-md-3">
                    <BlogListSideRight />
                </div>
            </div>
        </section>
    )
}

export default SectionBlogDetail
