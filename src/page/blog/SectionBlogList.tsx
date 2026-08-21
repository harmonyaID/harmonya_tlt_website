'use client'
import useBlogs from '@/page/blog/hook/useBlogs'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper'
import { BadgeRow } from '@/component/general/Badge'
import Link from 'next/link'

const SectionBlogList = ({ passBlogs = [], passPage = 1 }) => {
    const { list, isLoading, _handleChangePage } = useBlogs({
        passBlogs,
        passPage,
    })

    return (
        <section className="section-space-small container">
            <div className="row">
                {list.map((vm: any, index) => {
                    const url = vm?.link
                        ? vm?.link
                        : vm?.slug
                          ? '/blog/' + vm?.slug
                          : '#'
                    return (
                        <div key={index} className="col-md-3">
                            <Link
                                className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                href={url || '#'}>
                                <div className="section-blog-banner-reel">
                                    <Image
                                        src={vm?.thumbnail || IMAGE_EMPTY}
                                        alt={vm.title}
                                        fill
                                        className="object-fit-cover"
                                        // className="object-cover"
                                    />
                                </div>

                                <div className="">
                                    <p className="fs-13 mb-1">
                                        {formatDateTimeByTlt(vm.publishedAt)}
                                    </p>
                                    <p className="fs-20 wp-font-tt-drugs">
                                        {vm.title}
                                    </p>

                                    <BadgeRow badges={vm.tags} />
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SectionBlogList
