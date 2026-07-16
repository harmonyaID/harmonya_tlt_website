import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { SectionDescription } from '@/component/text/Paragraph'
import { BtnLinkPrimary, BtnPrimary } from '@/component/general/Button'
import Image from 'next/image'
import HomeAboutMap from '@/asset/image/home/home-about-map.svg'
import HomeAboutBanner from '@/asset/image/home/home-about-banner.jpg'

const SectionHomeAbout = ({ content = {} }: { content?: any }) => {
    return (
        <SectionGeneral>
            <div className="row gx-8">
                <div className="col-lg-6">
                    <div className="hstack justify-content-end">
                        <div className="col-lg-9">
                            <SectionTitle className="pb-5 font-tt-drugs text-uppercase">
                                Nusa Lembongan, your barefoot escape from the
                                ordinary
                            </SectionTitle>

                            <SectionDescription>
                                <b>
                                    Ringed by crystal-clear turquoise waters and
                                    just 30 minutes from Bali.
                                </b>{' '}
                                Wake to the sound of waves, the warmth of
                                tropical sun on your skin, and the distant crow
                                of a rooster drifting over from a nearby
                                village, a gentle reminder that real local life
                                hums quietly alongside your holiday.
                            </SectionDescription>
                        </div>
                    </div>

                    <Image
                        src={HomeAboutMap}
                        alt="about home"
                        className="w-100 h-auto"
                    />
                </div>
                <div className="col-lg-6">
                    <div className="col-lg-8">
                        <div className="w-100 h-100 position-relative">
                            <Image
                                src={HomeAboutBanner}
                                alt="about banner"
                                className="w-100 h-100"
                                // fill
                            />
                        </div>

                        {content.sideContent ? (
                            <div
                                className="py-5 text-grey-400 fs-20 mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: content.sideContent,
                                }}
                            />
                        ) : (
                            <SectionDescription className="pb-5 pt-5">
                                The Lembongan Traveller is your trusted,
                                Australian-owned complete guide to Nusa
                                Lembongan and Nusa Ceningan. More than a place
                                to rest your head, our handpicked collection of
                                villas, resorts, and bungalows puts you right at
                                the heart of island life. We make it easy to
                                find your perfect stay.
                            </SectionDescription>
                        )}

                        <BtnLinkPrimary className="rounded-pill">
                            {content?.buttonText || 'Discover More'}
                        </BtnLinkPrimary>
                    </div>
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeAbout
