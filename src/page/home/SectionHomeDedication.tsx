'use client'
import Image from 'next/image'
import { BtnIcon, BtnLinkBasic } from '@/component/general/Button'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'
import { imgBoxConfig, imgLandscapeConfig } from '@/config/urlImage.config'

const SectionHomeDedication = ({ content = {} }: PropsSectionContent) => {
    return (
        <section className="position-relative overflow-hidden section-home-dedication">
            <div className="position-absolute banner-image overflow-hidden">
                <Image
                    fill
                    src={imgLandscapeConfig(content?.backgroundImage)}
                    alt="banner"
                    className="object-fit-cover"
                />
            </div>

            <div className="section-space container position-relative z-1">
                <div className="row gx-7 py-4">
                    <div className="col-lg-6">
                        <div className="vstack gap-4 text-white">
                            {content?.logo ? (
                                <div className="lembongan-logo">
                                    <Image
                                        src={content.logo}
                                        alt="logo lembongan"
                                        fill
                                    />
                                </div>
                            ) : null}

                            <RenderHtml
                                className="text-tt-dgrup"
                                html={content.content}
                            />

                            <div className="pt-4">
                                <BtnLinkBasic
                                    href={content.buttonLink || '#'}
                                    className="btn-outline-white rounded-pill">
                                    <BtnIcon>{content.buttonText}</BtnIcon>
                                </BtnLinkBasic>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <Image
                            src={imgBoxConfig(content.image)}
                            className="w-100 h-auto position-relative"
                            fill
                            alt="data"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionHomeDedication
