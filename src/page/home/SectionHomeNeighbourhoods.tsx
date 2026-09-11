'use client'
import RenderHtml from '@/component/general/RenderHtml'
import { PropsSectionContent } from '@/type/sectionContent.type'
import Link from 'next/link'
import Image from 'next/image'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import { imgReelConfig } from '@/config/urlImage.config'

const SectionHomeNeighbourhoods = ({ content = {} }: PropsSectionContent) => {
    const contentItems = content?.items || []

    return (
        <section className="section-space-small overflow-hidden">
            <div className="container">
                <RenderHtml
                    className="wp-general-content-head-and-desc"
                    html={content?.content || ''}
                />

                <div className="row g-4 wrap-row">
                    {contentItems?.map((vm: any, index: number) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <Link
                                    className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                    href={vm.buttonLink || '#'}>
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
                                            src={imgReelConfig(vm?.image)}
                                            alt={vm.title}
                                            fill
                                            className="object-fit-cover"
                                        />
                                    </WrapImageHoverOverlay>

                                    <div className="">
                                        <p className="fs-24 wp-font-tt-drugs desc-two-line">
                                            {vm.title}
                                        </p>
                                        <p className="fs-13 wp-font-tt-drugs mb-0">
                                            {vm.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default SectionHomeNeighbourhoods
