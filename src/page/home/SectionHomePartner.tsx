'use client'
import SectionGeneral from '@/component/general/SectionGeneral'
import RenderHtml from '@/component/general/RenderHtml'
import { BtnLinkBasic } from '@/component/general/Button'
import SwipeSlideBanner from '@/component/swiperSlide/SwipeSlideBanner'
import Image from 'next/image'

const SectionHomePartner = ({
    content = {},
    partners,
}: {
    content?: any
    partners?: any[]
}) => {
    console.log('SECTION8: ', content)
    console.log('SECTION8 partners: ', partners)

    return (
        <SectionGeneral>
            <div className="container">
                <RenderHtml
                    className="pb-5 font-tt-drugs text-uppercase text-grey-300"
                    html={content.content}
                />

                <div className="row justify-content-center py-4">
                    <div className="col-md-10">
                        <SwipeSlideBanner
                            className="section-logo-swiper-auto"
                            items={partners}
                            breakpoints={{
                                576: { slidesPerView: 3, spaceBetween: 20 },
                                992: { slidesPerView: 4, spaceBetween: 24 },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 24,
                                },
                                // 1200: { slidesPerView: 4, spaceBetween: 24 },
                            }}
                            isNavigation={false}
                            swiperConfig={{
                                autoplay: true,
                                loop: true,
                            }}
                            contentElement={(dataElement: any) => (
                                <div className="position-relative section-home-logo-partner">
                                    <Image
                                        src={dataElement.logo || ''}
                                        alt={''}
                                        className="h-auto mh-100 w-100 position-relative"
                                        fill
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="text-center">
                    <BtnLinkBasic
                        className="btn-outline-grey-100 rounded-pill"
                        href={content?.buttonLink || '#'}>
                        {content.buttonText}
                    </BtnLinkBasic>
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomePartner
