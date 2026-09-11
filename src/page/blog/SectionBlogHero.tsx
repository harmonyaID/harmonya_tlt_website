'use client'
import BlogBannerDefault from '@/asset/image/default/blog-hero-banner-default.jpg'
import Image from 'next/image'
import BlogThumbnailDefault from '@/asset/image/default/blog-thumbnail-default.jpg'
import { BtnBasic, BtnIcon } from '@/component/general/Button'
import { BadgeRow } from '@/component/general/Badge'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'

const SectionBlogHero = ({
    content = {},
    blog = {},
}: {
    content?: any | {}
    blog?: any | {}
}) => {
    console.log('blog: ', blog)

    const url = blog?.link
        ? blog?.link
        : blog?.slug
          ? '/blog/' + blog?.slug
          : '#'

    const { seo = {}, excerpt = '' } = blog

    return (
        <section className="section-blog-hero section-blog-hero-v2">
            <div className="banner-image position-absolute">
                <Image
                    src={content.videoThumbnail || BlogBannerDefault}
                    // src={HomeBanner}
                    className="object-fit-cover w-100 h-100 "
                    alt="Home Banner"
                    fill
                />
            </div>

            <div className="container content-blog-first z-1">
                <Link href={url || '#'} className="row g-0 wp-hover-image">
                    <div className="col-md-6">
                        <WrapImageHoverOverlay className="overflow-hidden position-relative w-100 blog-thumbnail-first">
                            <Image
                                src={blog.thumbnail || BlogThumbnailDefault}
                                // src={HomeBanner}
                                className="object-fit-cover w-100 h-100"
                                alt={blog.title || 'Default Blog Banner'}
                                fill
                            />
                        </WrapImageHoverOverlay>
                    </div>
                    <div className="col-md-6 ">
                        <div className="bg-green-400 text-white py-5 px-5 vstack justify-content-center h-100">
                            <div className="">
                                <p className="">
                                    {blog.publishedAt
                                        ? formatDateTimeByTlt(blog.publishedAt)
                                        : '-'}
                                </p>
                                <h1 className="fs-40 font-weight-bold mb-4 desc-two-line">
                                    {blog.title || 'Blog Empty'}
                                </h1>

                                {/*<BtnBasic*/}
                                {/*    className="btn-outline-white rounded-pill"*/}
                                {/*    type="button">*/}
                                {/*    Discover*/}
                                {/*</BtnBasic>*/}

                                {blog.tags ? (
                                    <BadgeRow
                                        badges={blog.tags}
                                        // className="pt-4"
                                        classNameBadge="py-2 px-3"
                                    />
                                ) : null}

                                {/*<p className="pt-3 mb-0">*/}
                                {/*    On many islands, the beach club is something*/}
                                {/*    you do between other plans. On Nusa*/}
                                {/*    Lembongan, it pretty much is the plan.*/}
                                {/*</p>*/}
                                {seo?.description ? (
                                    <p className="fs-16 pt-3 mb-0 fext-grey-400 desc-two-line">
                                        {seo?.description}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default SectionBlogHero
