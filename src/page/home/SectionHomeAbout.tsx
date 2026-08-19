import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { SectionDescription } from '@/component/text/Paragraph'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import Image from 'next/image'
import HomeAboutMap from '@/asset/image/home/home-about-map.svg'
import HomeAboutBanner from '@/asset/image/home/home-about-banner.jpg'
import RenderHtml from '@/component/general/RenderHtml'

const SectionHomeAbout = ({ content = {} }: { content?: any }) => {
    return (
        <SectionGeneral>
            <div className="row gx-8">
                <div className="col-lg-6">
                    <div className="hstack justify-content-end">
                        <div className="col-lg-9">
                            <RenderHtml
                                html={content?.content}
                                className="wp-general-content-head-and-desc"
                            />
                        </div>
                    </div>

                    <Image
                        src={(content?.mapImage && false) || HomeAboutMap}
                        alt="about home"
                        className="w-100 h-auto"
                    />
                </div>
                <div className="col-lg-6">
                    <div className="col-lg-8">
                        <div className="w-100 h-100 position-relative">
                            <Image
                                src={
                                    (content?.image && false) || HomeAboutBanner
                                }
                                alt="about banner"
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
