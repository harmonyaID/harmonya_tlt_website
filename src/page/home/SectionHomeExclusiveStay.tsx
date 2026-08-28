'use client'

import SectionGeneral from '@/component/general/SectionGeneral'
import {
    BtnBasic,
    BtnIcon,
    BtnLinkBasic,
    CodeIconArrow,
} from '@/component/general/Button'
import { SectionDescription } from '@/component/text/Paragraph'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import { BadgeTag } from '@/component/general/Badge'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import PropertyResort01 from '@/asset/image/villa/property-resort-01.png'
import PropertyResort02 from '@/asset/image/villa/property-resort-02.png'
import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import IconPropertyBad from '@/component/icon/IconPropertyBad'
import IconPropertyGuest from '@/component/icon/IconPropertyGuest'
import IconPropertyEat from '@/component/icon/IconPropertyEat'
import IconPropertyPool from '@/component/icon/IconPropertyPool'
import IconArrowRight from '@/component/icon/IconArrowRight'
import IconArrowLeft from '@/component/icon/IconArrowLeft'

const iconPropertys = [
    {
        media: 'IconPropertyBad',
        value: '',
    },
]

const tags = ['Family Friendly', 'Guest’s Favorite', 'Breakfast']

const Amities = ({ icon, value }: { icon?: any; value?: any }) => (
    <div className="hstack gap-2 flex-wrap align-items-center">
        <span className="text-grey-200">{icon}</span>
        {value}
    </div>
)

const SectionHomeExclusiveStay = ({ content = {} }: PropsSectionContent) => {
    const swiperRef = useRef<SwiperType | null>(null)

    return (
        <SectionGeneral>
            <div className="container">
                <div className="row justify-content-between gy-4">
                    <div className="col-lg-4">
                        <RenderHtml
                            className="pb-4 text-grey-300 fw-lighter wp-font-tt-drugs"
                            html={content.content}
                        />

                        <BtnLinkBasic
                            className="btn-outline-grey-200 rounded-pill"
                            href={content?.buttonLink || '#'}>
                            <BtnIcon>{content.buttonText}</BtnIcon>
                        </BtnLinkBasic>
                    </div>
                    <div className="col-lg-6">
                        <SectionDescription>
                            {content.description || ''}
                        </SectionDescription>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="w-100 hstack justify-content-end pt-3 pb-4">
                        <div className="hstack gap-4">
                            <div
                                role="button"
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                                <IconArrowLeft />
                            </div>

                            <div
                                role="button"
                                onClick={() => swiperRef.current?.slideNext()}
                                className="box-40 border-gray-200 border rounded-circle d-flex justify-content-center align-items-center text-grey-200">
                                <IconArrowRight />
                            </div>
                        </div>
                    </div>

                    <SwipeSlideBanner
                        items={[
                            {
                                image: PropertyVilla01,
                            },
                            {
                                image: PropertyResort01,
                            },
                            {
                                image: PropertyResort02,
                            },
                            4,
                            5,
                            6,
                            7,
                            8,
                        ]}
                        isNavigation={false}
                        swiperConfig={{
                            loop: true,
                        }}
                        passUseRef={swiperRef}
                        breakpoints={{
                            576: { slidesPerView: 2, spaceBetween: 20 },
                            992: { slidesPerView: 3, spaceBetween: 24 },
                            1200: { slidesPerView: 3.5, spaceBetween: 24 },
                        }}
                        contentElement={(dataElement: any) => {
                            const dataTags = dataElement.tags || tags || []

                            return (
                                <>
                                    <Link
                                        className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden property-card-slider"
                                        href={dataElement.buttonLink || '#'}>
                                        <WrapImageHoverOverlay
                                            className="banner"
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
                                                alt={
                                                    dataElement.title ||
                                                    'Property'
                                                }
                                                fill
                                                className="object-fit-cover"
                                            />
                                        </WrapImageHoverOverlay>

                                        <div className="">
                                            <p className="fs-20 text-primary mb-0">
                                                {dataElement?.category?.name ||
                                                    'Villa'}
                                            </p>

                                            <p className="fs-24 mb-1 wp-font-tt-drugs desc-two-line">
                                                {dataElement.title ||
                                                    'VILLA TANJUNG'}
                                            </p>
                                            <p className="fs-13 wp-font-tt-drugs mb-3">
                                                {dataElement.description ||
                                                    'Tamarind Bay'}
                                            </p>

                                            <div className="hstack gap-3 flex-wrap mb-3 text-grey-200">
                                                <Amities
                                                    icon={<IconPropertyBad />}
                                                    value={2}
                                                />
                                                <Amities
                                                    icon={<IconPropertyGuest />}
                                                    value={2}
                                                />
                                                <Amities
                                                    icon={<IconPropertyEat />}
                                                    value="Dine In"
                                                />
                                                <Amities
                                                    icon={<IconPropertyPool />}
                                                    value="Pool"
                                                />
                                            </div>

                                            <div className="hstack gap-2 flex-wrap">
                                                {/*@ts-ignore*/}
                                                {dataTags.map((tag, idx) => (
                                                    <BadgeTag key={idx}>
                                                        {tag}
                                                    </BadgeTag>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        }}
                    />
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeExclusiveStay
