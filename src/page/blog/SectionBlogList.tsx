'use client'
import useBlogs from '@/page/blog/hook/useBlogs'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper'

const SectionBlogList = ({ passBlogs = [], passPage = 1 }) => {
    const { list, isLoading, _handleChangePage } = useBlogs({
        passBlogs,
        passPage,
    })

    return (
        <section className="section-space-small container">
            <div className="row">
                {list.map((vm: any, index) => {
                    return (
                        <div key={index} className="col-md-3">
                            <div className="w-100 vstack gap-3">
                                <div
                                    className="image-hover w-100"
                                    style={{ height: 380 }}>
                                    <Image
                                        src={vm?.thumbnail || IMAGE_EMPTY}
                                        alt={vm.title}
                                        fill
                                        className="object-fit-cover"
                                        // className="object-cover"
                                    />
                                </div>

                                <div className="">
                                    <p className="fs-13 mb-2">
                                        {formatDateTimeByTlt(vm.publishedAt)}
                                    </p>
                                    <p className="fs-20 wp-font-tt-drugs">
                                        {vm.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SectionBlogList
