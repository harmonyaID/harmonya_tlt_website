import Image from 'next/image'
import { BtnPrimary } from '@/component/general/Button'
import SlideBannerBackground from '@/asset/image/home/home-book-slide-banner.jpg'
import { PropsSectionContent } from '@/type/sectionContent.type'

const SectionHomeBook = ({ content = {} }: PropsSectionContent) => {
    return (
        <section className="position-relative overflow-hidden">
            <Image
                src={SlideBannerBackground}
                className="position-absolute banner-image"
                alt="lembongan bali"
            />

            <div className="section-space-small container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-5 text-center text-white">
                        <div className="vstack gap-4">
                            <p className="fs-14 mb-0">Limited Offers</p>
                            <div className="">
                                <h2 className="font-tt-drugs">
                                    BOOK IN ADVANCE
                                </h2>
                                <p className="fs-14">
                                    Book ahead and secure your stay for 2026
                                    island escape and get a special rate.
                                </p>
                            </div>

                            <div className="">
                                <BtnPrimary className="rounded-pill">
                                    DISCOVER MORE
                                </BtnPrimary>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionHomeBook
