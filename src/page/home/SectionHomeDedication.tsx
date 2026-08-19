import SectionGeneral from '@/component/general/SectionGeneral'
import { H3 } from '@/component/text/Heading'
import { SectionDescription } from '@/component/text/Paragraph'
import Image from 'next/image'
import Banner from '@/asset/image/home/home-dedicated-banner.jpg'
import { BtnBasic, BtnLinkBasic } from '@/component/general/Button'
import LogoLembongan from '@/asset/image/home/home-logo-lembongan.png'
import DataImg from '@/asset/image/home/home-dedicated-image.png'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'

const SectionHomeDedication = ({ content = {} }: PropsSectionContent) => {
    // console.log('content: ', content)

    return (
        <section className="position-relative overflow-hidden section-home-dedication">
            <div className="position-absolute banner-image overflow-hidden">
                <Image
                    fill
                    src={content?.backgroundImage || Banner}
                    alt="banner"
                    className="object-fit-cover"

                    // className=" position-absolute banner-image"
                />
            </div>

            <div className="section-space container position-relative z-1">
                <div className="row gx-7 py-4">
                    <div className="col-lg-6">
                        <div className="vstack gap-4 text-white">
                            <div className="lembongan-logo">
                                <Image
                                    src={content.logo || LogoLembongan}
                                    alt="logo lembongan"
                                    fill
                                />
                            </div>
                            <RenderHtml
                                className="text-tt-dgrup"
                                html={content.content}
                            />
                            {/*<p className="fs-20 mb-0">*/}
                            {/*    At Love for Lembongan, our mission is to uplift*/}
                            {/*    the local community by ensuring access to*/}
                            {/*    quality healthcare and education. Thanks to the*/}
                            {/*    generosity of our donors, and our partnership*/}
                            {/*    with Bali Children Foundation, we’ve made*/}
                            {/*    significant strides in both areas, focusing on*/}
                            {/*    those who need it most*/}
                            {/*</p>*/}
                            <div className="pt-4">
                                <BtnLinkBasic
                                    href={content.buttonLink || '#'}
                                    className="btn-outline-white rounded-pill">
                                    {content.buttonText}
                                </BtnLinkBasic>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <Image
                            src={content?.image || DataImg}
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
