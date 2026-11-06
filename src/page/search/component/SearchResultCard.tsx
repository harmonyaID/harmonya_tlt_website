import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper'

const SearchResultCard = ({ blog }: { blog: any }) => {
    const url = blog?.link ? blog?.link : blog?.slug ? '/blog/' + blog?.slug : '#'

    return (
        <div className="row g-5">
            <div className="col-md-6">
                <Link
                    className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden"
                    href={url}>
                    <WrapImageHoverOverlay
                        className="search-result-img"
                        contentOverlay={
                            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                <BtnBasic className="btn-outline-white rounded-pill">
                                    <div className="hstack align-items-center gap-1">
                                        Explore <CodeIconArrow />
                                    </div>
                                </BtnBasic>
                            </div>
                        }>
                        <Image
                            src={blog.thumbnail}
                            alt="about home"
                            fill
                            priority
                            className="object-fit-cover"
                        />
                    </WrapImageHoverOverlay>
                </Link>
            </div>
            <div className="col-md-6">
                <div className="vstack gap-3 justify-content-center h-100 color-555">
                    <p className="font-tt-drugs text-uppercase fw-light m-0">
                        {actionFormatDateStrict(
                            blog.publishedAt,
                            'MMMM DD, YYYY',
                            'DD/MM/YYYY HH:ii',
                        )}
                    </p>
                    <p className="font-tt-drugs fs-32 text-uppercase color-555 m-0">
                        {blog.title}
                    </p>
                    <div className="hstack gap-3 flex-wrap">
                        {blog.categories?.map((cat) => (
                            <div
                                key={cat.id}
                                className="badge fs-14 width-fit-content rounded-pill fw-300 px-3 mb-2"
                                style={{
                                    background: '#EBF7F6',
                                    border: '1px solid #98C9C9',
                                    color: '#555555',
                                }}>
                                {cat.name}
                            </div>
                        ))}
                    </div>
                    <p className="m-0">{blog.excerpt || '-'}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard
