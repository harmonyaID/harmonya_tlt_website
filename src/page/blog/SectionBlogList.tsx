'use client'
import useBlogs from '@/page/blog/hook/useBlogs'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper'
import { BadgeRow } from '@/component/general/Badge'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import Pagination from '@/component/general/Pagination'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import LoadingSpinner from '@/component/loading/LoadingSpinner'

const SectionBlogList = ({
    passBlogs = [],
    passPage = 1,
    passPagination = {},
}) => {
    const { list, isLoading, pagination, _handleChangePage } = useBlogs({
        passBlogs,
        passPage,
        passPagination,
    })

    return (
        <section className="section-space-small container">
            {isLoading ? (
                <div className="text-center">
                    <LoadingSpinner />
                </div>
            ) : !isEmpty(list) ? (
                <>
                    <div className="row gy-5 pb-5">
                        {!isEmpty(list)
                            ? list.map((vm: any, index) => {
                                  const url = vm?.link
                                      ? vm?.link
                                      : vm?.slug
                                        ? '/blog/' + vm?.slug
                                        : '#'

                                  const { seo = {}, excerpt = '' } = vm
                                  return (
                                      <div
                                          key={index}
                                          className="col-lg-3 col-md-4">
                                          <Link
                                              className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                              href={url || '#'}>
                                              <WrapImageHoverOverlay className="section-blog-banner-reel">
                                                  <Image
                                                      src={
                                                          vm?.thumbnail ||
                                                          IMAGE_EMPTY
                                                      }
                                                      alt={vm.title}
                                                      fill
                                                      className="object-fit-cover"
                                                      // className="object-cover"
                                                  />
                                              </WrapImageHoverOverlay>

                                              <div className="">
                                                  <p className="fs-13 mb-1">
                                                      {formatDateTimeByTlt(
                                                          vm.publishedAt,
                                                      )}
                                                  </p>
                                                  <p className="fs-20 wp-font-tt-drugs desc-two-line mb-0">
                                                      {vm.title}
                                                  </p>

                                                  {vm?.tags &&
                                                  vm.tags.length ? (
                                                      <BadgeRow
                                                          className="pt-3"
                                                          badges={vm.tags}
                                                      />
                                                  ) : null}

                                                  {seo.description ? (
                                                      <p className="fs-12 pt-3 mb-0 desc-two-line">
                                                          {seo.description}
                                                      </p>
                                                  ) : null}
                                              </div>
                                          </Link>
                                      </div>
                                  )
                              })
                            : null}
                    </div>

                    <div className="py-4">
                        <Pagination
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
        </section>
    )
}

export default SectionBlogList
