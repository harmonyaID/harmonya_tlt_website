'use client'
import RenderHtml from '@/component/general/RenderHtml'
import { BtnLinkPrimary } from '@/component/general/Button'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { usePathname } from 'next/navigation'
import { slugify } from '@/helper/slugify.helper'

interface BlockInfoProps {
    title?: string
    subTitle?: string
    description?: string
    link?: string
    buttonName?: string
}

const BlockInfo = ({
    title,
    subTitle,
    description,
    link = '#',
    buttonName = 'DISCOVER MORE',
}: BlockInfoProps) => {
    return (
        <>
            <div className="pb-3P">
                <h5 className="fs-48 fw-light text-uppercase mb-2 text-grey-200">
                    {title}
                </h5>
                {/*<p className="fs-24 mb-0 text-uppercase text-grey-200">*/}
                {/*    {subTitle}*/}
                {/*</p>*/}
            </div>

            {/*<p className="fs-20 fw-light mb-3 text-grey-400 mb-4">*/}
            {/*    {description}*/}
            {/*</p>*/}
            <RenderHtml
                className="fs-20 text-grey-400 wp-head-font-tt-drugs mb-4"
                // @ts-ignore
                html={description}
            />

            <BtnLinkPrimary href={link} isIconArrow className="rounded-pill">
                {buttonName}
            </BtnLinkPrimary>
        </>
    )
}

export const IslandSectionImageAndContent = ({
    title,
    subTitle,
    description,
    link = '#',
    image,
}: BlockInfoProps & { image?: string }) => (
    <section className="section-space-small">
        <div className="container">
            <div className="row gx-8 gy-5 align-items-center">
                <div className="col-md-6">
                    <WrapImageHoverOverlay className="h-480-px">
                        <Image
                            src={image || IMAGE_EMPTY}
                            alt={
                                title || 'Adventure Awaits Beneath the Surface'
                            }
                            fill
                            className="object-fit-cover"
                            // className="object-cover"
                        />
                    </WrapImageHoverOverlay>
                </div>

                <div className="col-md-6">
                    <div className="pe-5">
                        <BlockInfo
                            title={title}
                            subTitle={subTitle}
                            description={description}
                            link={link || '#'}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export const IslandSectionContentAndImage = ({
    title,
    subTitle,
    description,
    link = '#',
    image,
}: BlockInfoProps & { image?: string }) => (
    <section className="section-space-small bg-neutral-100">
        <div className="container">
            <div className="row gx-8 gy-5 align-items-center">
                <div className="col-md-5">
                    <div className="pe-5">
                        <BlockInfo
                            title={title}
                            subTitle={subTitle}
                            description={description}
                            link={link || '#'}
                        />
                    </div>
                </div>

                <div className="col-md-7 ">
                    <WrapImageHoverOverlay className="h-480-px">
                        <Image
                            src={image || IMAGE_EMPTY}
                            alt={
                                title || 'Adventure Awaits Beneath the Surface'
                            }
                            fill
                            className="object-fit-cover"
                            // className="object-cover"
                        />
                    </WrapImageHoverOverlay>
                </div>
            </div>
        </div>
    </section>
)
