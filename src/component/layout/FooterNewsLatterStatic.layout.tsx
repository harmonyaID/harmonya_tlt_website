'use client'

import Image from 'next/image'
import { BtnPrimary } from '@/component/general/Button'
import { IconSvgMailWhite } from '@/component/general/IconSvg'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import BackgroundSection from '@/asset/image/footer/footer-newslatter-bg.jpg'

const FooterNewsLatterStatic = () => {
    return (
        <section className="position-relative overflow-hidden">
            <div className="position-absolute banner-image overflow-hidden">
                <Image
                    fill
                    src={imgLandscapeConfig(BackgroundSection)}
                    className="object-fit-cover"
                    alt="lembongan bali"
                />
            </div>

            <div className="section-space-small container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center text-white">
                        <p className="h2 mb-2 font-tt-drugs">INSIDER TIPS</p>
                        <p className="fs-16 pb-3">
                            Travel tips, island news and special offers
                            delivered to your inbox.
                        </p>

                        <div className="hstack gap-3 align-items-center pt-3">
                            <div className="position-relative col">
                                <div className="input-group rounded-pill wp-input-newsLatter">
                                    <span
                                        className="input-group-text"
                                        id="basic-addon1">
                                        <IconSvgMailWhite />
                                    </span>
                                    <input
                                        type="email"
                                        id="newlater-email"
                                        className="form-control"
                                        placeholder="EMAIL"
                                    />
                                </div>
                            </div>
                            <BtnPrimary type="button" className="rounded-pill">
                                SUBSCRIBE
                            </BtnPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FooterNewsLatterStatic
