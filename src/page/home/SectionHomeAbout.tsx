'use client'

import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { SectionDescription } from '@/component/text/Paragraph'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import Image from 'next/image'
import HomeAboutMap from '@/asset/image/home/home-about-map.svg'
import HomeAboutBanner from '@/asset/image/home/home-about-banner.jpg'
import RenderHtml from '@/component/general/RenderHtml'
import {
    imgBoxConfig,
    imgLandscapeConfig,
    imgReelConfig,
} from '@/config/urlImage.config'

const SectionHomeAbout = ({ content = {} }: { content?: any }) => {
    return (
        <SectionGeneral className="section-home-about px-3 px-lg-0">
            <div className="row gx-8 gy-6">
                <div className="col-lg-6">
                    <div className="hstack justify-content-end pb-3 pb-lg-0">
                        <div className="col-lg-9">
                            <RenderHtml
                                html={content?.content}
                                className="wp-general-content-head-and-desc"
                            />
                        </div>
                    </div>

                    <div className="wp-image-map">
                        <Image
                            src={imgLandscapeConfig(content?.mapImage)}
                            alt="about home"
                            fill
                            className=""
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="col-lg-8">
                        <div className="wp-image-map">
                            <Image
                                src={imgReelConfig(content?.image)}
                                alt="about banner"
                                fill
                                className="w-100 h-100"
                            />
                        </div>

                        {content?.sideContent ? (
                            <>
                                <RenderHtml
                                    html={content?.sideContent}
                                    className="wp-general-content-head-and-desc py-5"
                                />
                            </>
                        ) : null}

                        <BtnLinkPrimary
                            className="rounded-pill"
                            isIconArrow
                            href={content?.buttonLink || '#'}>
                            {content?.buttonText || 'Discover More'}
                        </BtnLinkPrimary>
                    </div>
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeAbout
