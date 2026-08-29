import useBlogs from '@/page/blog/hook/useBlogs'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper'
import { BadgeRow } from '@/component/general/Badge'
import Link from 'next/link'

const CardPlaceholder = ({ isLast }: { isLast?: boolean }) => (
    <div className="row flex-row gx-3 gy-3 text-grey-400 placeholder-glow">
        <div className="col-md-8">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-9"></span>
            <span className="placeholder col-8"></span>
            <span className="placeholder col-5"></span>
        </div>
        <div className="col-md-4">
            <span className="placeholder col-12 section-blog-detail-banner-small"></span>
        </div>

        {!isLast ? (
            <div className="w-100 pb-4 mt-0 border-bottom border-neutral-100" />
        ) : null}
    </div>
)

const BlogListSideRight = () => {
    const { list, isLoading } = useBlogs()

    const placeholders = Array(4).fill(0)

    return (
        <>
            <p className="fs-32 text-grey-400 font-tt-drugs">Latest Post</p>

            <div className="vstack gap-4">
                {isLoading
                    ? placeholders.map((vm, index) => {
                          const isLast = index === list.length - 1
                          return <CardPlaceholder isLast={isLast} key={index} />
                      })
                    : list.map((vm, index) => {
                          const isLast = index === list.length - 1

                          const url = vm?.link
                              ? vm?.link
                              : vm?.slug
                                ? '/blog/' + vm?.slug
                                : '#'

                          return (
                              <Link
                                  key={index}
                                  href={url || '#'}
                                  className="row flex-row gx-3 gy-3 text-grey-400 wp-hover-image">
                                  <div className="col-md-8 ">
                                      <p className="fs-13 wp-font-tt-drugs mb-2">
                                          {formatDateTimeByTlt(vm.publishedAt)}
                                      </p>
                                      <p className="fs-16 wp-font-tt-drugs desc-two-line">
                                          {vm.title}
                                      </p>

                                      <BadgeRow badges={vm.tags} />
                                  </div>

                                  <div className="col-md-4">
                                      <div className="sc-blog-banner-right-bar">
                                          <Image
                                              src={vm?.thumbnail || IMAGE_EMPTY}
                                              alt={vm.title}
                                              className="img-cover-general"
                                              fill
                                          />
                                      </div>
                                  </div>

                                  {!isLast ? (
                                      <div className="w-100 pb-4 mt-0 border-bottom border-neutral-100" />
                                  ) : null}
                              </Link>
                          )
                      })}
            </div>
        </>
    )
}

export default BlogListSideRight
