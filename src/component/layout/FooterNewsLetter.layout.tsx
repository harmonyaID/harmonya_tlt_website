import Image from 'next/image'
import BannerBackground from '@/asset/image/footer/footer-newslatter-bg.jpg'
import { BtnPrimary } from '@/component/general/Button'
import { PropsSectionContent } from '@/type/sectionContent.type'
import { IconSvgMailWhite } from '@/component/general/IconSvg'
import RenderHtml from '@/component/general/RenderHtml'

const FooterNewsLetterLayout = ({ content = {} }: PropsSectionContent) => {
    return (
        <section className="position-relative overflow-hidden">
            <div className="position-absolute banner-image overflow-hidden">
                <Image
                    // src={BannerBackground}
                    // className="position-absolute banner-image"
                    fill
                    src={content?.background || BannerBackground}
                    className="object-fit-cover"
                    alt="lembongan bali"
                />
            </div>

            <div className="section-space-small container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center text-white">
                        <p className="fs-24 mb-1">
                            {content.label || 'Newsletters'}
                        </p>

                        <RenderHtml html={content.content} />
                        {/*<p className="h2 mb-2 font-tt-drugs">*/}
                        {/*    STAY IN THE KNOW*/}
                        {/*</p>*/}
                        {/*<p className="fs-16 pb-3">*/}
                        {/*    Get updates on our offers and latest news, join our*/}
                        {/*    mailing list*/}
                        {/*</p>*/}

                        <div className="hstack gap-3 align-items-center pt-3">
                            <div className="position-relative col">
                                {/*<div className="content-input-newsletter">*/}
                                {/*    <input*/}
                                {/*        type="email"*/}
                                {/*        className="form-control rounded-pill border border-white"*/}
                                {/*        placeholder="e.g arbi@thelemongantraveller.com"*/}
                                {/*    />*/}
                                {/*    <div className="wp-icon position-absolute">*/}
                                {/*        <IconSvgMailWhite />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

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
                                        placeholder={content.inputPlaceholder}
                                    />
                                </div>
                            </div>
                            <BtnPrimary type="button" className="rounded-pill">
                                {/*SUBSCRIBE*/}
                                {content?.buttonText || 'SUBSCRIBEs'}
                            </BtnPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FooterNewsLetterLayout
