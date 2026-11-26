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
import ValidImage from '@/component/general/ValidImage'
import joinClassNameHelper from '@/helper/joinClassName.helper'
import useBlogCategories from '@/page/blog/hook/useBlogCategories'
import { useState } from 'react'
import { BtnBasic } from '@/component/general/Button'

const CATEGORY_LIMIT = 4

const SectionBlogList = () => {
    const [isLimit, setIsLimit] = useState(true)

    const {
        list,
        isLoading,
        pagination,
        _handleChangePage,
        search,
        _handleChangeCategory,
    } = useBlogs()

    const { list: categories } = useBlogCategories()

    const visibleCategories = (() => {
        if (!isLimit) return categories
        const limited = categories.slice(0, CATEGORY_LIMIT)
        const selected = categories.find(
            (cat: any) => cat.id === search?.categoryIds,
        )
        return selected && !limited.includes(selected)
            ? [...limited, selected]
            : limited
    })()

    return (
        <>
            <div className="container my-4">
                <div className="hstack gap-3 flex-wrap">
                    <p className="m-0 me-3 fs-24 font-tt-drugs text-uppercase">
                        Categories:
                    </p>

                    {[{ id: '', name: 'All' }, ...visibleCategories].map(
                        (cat: any) => (
                            <button
                                key={cat.id || 'all'}
                                type="button"
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.7rem 1rem',
                                }}
                                onClick={() => _handleChangeCategory(cat.id)}
                                className={joinClassNameHelper(
                                    'badge fs-16 border rounded-pill fw-300 width-fit-content',
                                    search?.categoryIds === cat.id
                                        ? 'text-white border-primary bg-primary'
                                        : 'text-black bg-white',
                                )}>
                                {cat.name}
                            </button>
                        ),
                    )}

                    {categories.length > CATEGORY_LIMIT && (
                        <BtnBasic
                            type="button"
                            className="fs-16 fw-300 width-fit-content text-primary"
                            handle={() => setIsLimit((prev) => !prev)}>
                            {isLimit ? 'Show More' : 'Show Less'}
                        </BtnBasic>
                    )}
                </div>
            </div>

            <section className="section-space-small container">
                {isLoading ? (
                    <div className="text-center">
                        <LoadingSpinner />
                    </div>
                ) : !isEmpty(list) ? (
                    <>
                        <div className="row gy-5 pb-5">
                            {!isEmpty(list)
                                ? list?.map((vm: any, index) => {
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
                                                      <ValidImage
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
                                                                      key={
                                                                          cat.id
                                                                      }
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
        </>
    )
}

export default SectionBlogList
