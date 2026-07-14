import Image from 'next/image'
import BannerBackground from '@/asset/image/footer/footer-newslatter-bg.jpg'
import { BtnPrimary } from '@/component/general/Button'

const FooterNewsLetterLayout = () => {
    return (
        <section className="position-relative overflow-hidden">
            <Image
                src={BannerBackground}
                className="position-absolute banner-image"
                alt="lembongan bali"
            />

            <div className="section-space-small container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center text-white">
                        <p className="fs-24 mb-1">Newsletter</p>
                        <p className="h2 mb-2 font-tt-drugs">
                            STAY IN THE KNOW
                        </p>
                        <p className="fs-16 pb-3">
                            Get updates on our offers and latest news, join our
                            mailing list
                        </p>

                        <div className="hstack gap-3 align-items-center">
                            <div className="position-relative col">
                                <input
                                    type="email"
                                    className="form-control bg-neural-100 rounded-pill"
                                    placeholder="e.g arbi@thelemongantraveller.com"
                                />
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

export default FooterNewsLetterLayout
