'use client'
import RenderHtml from '@/component/general/RenderHtml'
import { PropsSectionContent } from '@/type/sectionContent.type'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import Link from 'next/link'

const SectionHomeLiveTheIslandLife = ({
    content = {},
}: PropsSectionContent) => {
    return (
        <section className="section-space-small position-relative overflow-hidden bg-neutral-100">
            <div className="container">
                <RenderHtml
                    className="wp-general-content-head-and-desc pb-4"
                    html={content?.content || ''}
                />

                <div className="row justify-content-center">
                    <div className="col-lg-8 d-flex justify-content-center">
                        <ul
                            className="nav nav-underline nav-tabs-primary justify-content-betweenP width-fit-content border-bottom"
                            id="myTab"
                            role="tablist">
                            {content?.tabs?.map((vm: any, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        role="presentation"
                                        className="nav-item">
                                        <button
                                            className={
                                                'nav-link fw-light px-5 fs-24 ' +
                                                (index < 1 ? 'active' : '')
                                            }
                                            id={'home-tab-' + index}
                                            data-bs-toggle="tab"
                                            data-bs-target={
                                                '#data-tab-pane-' + index
                                            }
                                            type="button"
                                            role="tab"
                                            aria-controls={
                                                'data-tab-pane-' + index
                                            }
                                            aria-selected="true">
                                            {vm.tabName}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="tab-content py-5" id="myTabContent">
                    {content?.tabs?.map((vm: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className={
                                    'tab-pane fade ' +
                                    (index < 1 ? 'show active' : '')
                                }
                                id={'data-tab-pane-' + index}
                                role="tabpanel"
                                aria-labelledby="profile-tab">
                                <SwipeSlideBanner
                                    items={vm.items}
                                    contentElement={(dataElement: any) => (
                                        <>
                                            <Link
                                                className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                                href={
                                                    dataElement.buttonLink ||
                                                    '#'
                                                }>
                                                <WrapImageHoverOverlay
                                                    className="section-blog-banner-reel"
                                                    contentOverlay={
                                                        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                                            <BtnBasic className="btn-outline-white rounded-pill">
                                                                <div className="hstack align-items-center gap-1">
                                                                    Explore{' '}
                                                                    <CodeIconArrow />
                                                                </div>
                                                            </BtnBasic>
                                                        </div>
                                                    }>
                                                    <Image
                                                        src={
                                                            dataElement?.image ||
                                                            IMAGE_EMPTY
                                                        }
                                                        alt={dataElement.title}
                                                        fill
                                                        className="object-fit-cover"
                                                        // className="object-cover"
                                                    />
                                                </WrapImageHoverOverlay>

                                                <div className="">
                                                    <p className="fs-24 wp-font-tt-drugs desc-two-line">
                                                        {dataElement.title}
                                                    </p>
                                                    <p className="fs-13 wp-font-tt-drugs mb-0">
                                                        {
                                                            dataElement.description
                                                        }
                                                    </p>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SectionHomeLiveTheIslandLife
