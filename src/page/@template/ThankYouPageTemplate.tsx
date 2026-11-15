'use client'

import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import Image from 'next/image'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import BGHero404 from '@/asset/image/default/bg-thank-u-page.jpeg'
import { BtnLinkBasic, BtnLinkPrimary } from '@/component/general/Button'
import { ReactNode } from 'react'

const ThankYouPageTemplate = ({
    title,
    description,
    button1,
    button2,
}: {
    title: string
    description: ReactNode
    button1?: {
        path: string
        label: string
    }
    button2?: {
        path: string
        label: string
    }
}) => {
    return (
        <TemplatePageBaseLayout isBgTransparent isSecondFooter={false}>
            <section className="section-thank-you-page bg-green-500 ">
                <div className="">
                    <Image
                        src={imgLandscapeConfig(BGHero404)}
                        className="h-100 thank-you-overlay"
                        alt={
                            'The Lembongan Traveller - Your Guide to Nusa Lembongan'
                        }
                        fill
                    />
                </div>

                <div className="top-0 position-absolute w-100 h-100 z-1 text-center">
                    <div className="vstack w-100 h-100 gap-5 justify-content-center align-items-center">
                        <h1
                            className="font-tt-drugs text-white text-uppercase"
                            style={{
                                fontSize: '46px',
                            }}>
                            {title}
                        </h1>

                        <div
                            className="mx-auto"
                            style={{
                                width: '40%',
                            }}>
                            {description}
                        </div>

                        <div className="hstack gap-3 justify-content-center text-uppercase">
                            {button2 && (
                                <BtnLinkBasic
                                    style={{
                                        padding: '.85rem 1.5rem',
                                    }}
                                    href={button2?.path}
                                    className="btn-outline-white rounded-pill">
                                    {button2?.label}
                                </BtnLinkBasic>
                            )}

                            {button1 && (
                                <BtnLinkPrimary
                                    href={button1?.path}
                                    style={{
                                        padding: '.80rem 1.9rem',
                                    }}
                                    className="rounded-pill ">
                                    {button1?.label}
                                </BtnLinkPrimary>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </TemplatePageBaseLayout>
    )
}

export default ThankYouPageTemplate
