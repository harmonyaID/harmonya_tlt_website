'use client'
import useBlogs from '@/page/blog/hook/useBlogs'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import {
    actionFormatDateStrict,
    formatDateTimeByTlt,
} from '@/helper/actionFormatDate.helper'
import { BadgeRow } from '@/component/general/Badge'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import Pagination from '@/component/general/Pagination'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import LoadingSpinner from '@/component/loading/LoadingSpinner'
import RenderHtml from '@/component/general/RenderHtml'

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

                                              <div className="vstack gap-2">
                                                  <p
                                                      className="fs-13 mb-0 text-uppercase font-tt-drugs"
                                                      style={{
                                                          letterSpacing:
                                                              '0.05em',
                                                      }}>
                                                      {actionFormatDateStrict(
                                                          vm.publishedAt,
                                                          'MMMM DD, YYYY',
                                                          'DD/MM/YYYY HH:ii',
                                                      )}
                                                  </p>
                                                  <p className="fs-20 font-tt-drugs desc-two-line mb-0 text-uppercase">
                                                      {vm.title}
                                                  </p>

                                                  <div className="hstack gap-3 flex-wrap">
                                                      {vm.categories?.map(
                                                          (cat) => (
                                                              <div
                                                                  key={cat.id}
                                                                  className="badge fs-14 width-fit-content rounded-pill fw-300 px-3 mb-2"
                                                                  style={{
                                                                      background:
                                                                          '#EBF7F6',
                                                                      border: '1px solid #98C9C9',
                                                                      color: '#555555',
                                                                  }}>
                                                                  {cat.name}
                                                              </div>
                                                          ),
                                                      )}
                                                  </div>

                                                  {vm.excerpt ? (
                                                      <RenderHtml
                                                          html={vm.excerpt}
                                                      />
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
