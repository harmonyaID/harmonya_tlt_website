import Image from 'next/image'
import HomeBanner from '@/asset/image/villa/villa-hero-main.jpg'
import { BtnPrimary } from '@/component/general/Button'
import { imgLandscapeConfig } from '@/config/urlImage.config'

const SectionVillaHero = ({ content = {} }: { content?: any | {} }) => {
    return (
        <>
            <section className="section-hero-general bg-green-800">
                <div className="general-hero-full-screen">
                    <Image
                        src={imgLandscapeConfig(HomeBanner)}
                        // className="object-fit-cover w-100 h-100"
                        className="h-100 banner-image"
                        alt="The lembongan traveller villa bali"
                    />
                </div>

                {/*Title*/}
                <div className="container content-hero-position-default text-center z-1">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 text-white">
                            <div
                                className="wp-font-tt-drugs"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        content?.content ||
                                        '<h1>FIND YOUR PERFECT STAY</h1>',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/*Search*/}
                <div className="container content-hero-position-bottom z-1">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="content-hero-search-cardP bg-white py-3 px-4 rounded-3">
                                <div className="row align-items-end g-3">
                                    <div className="col-md">
                                        <div className="">
                                            <label
                                                htmlFor="inputDates"
                                                className="form-label">
                                                {content.searchLabelDates ||
                                                    'DATES'}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputDates"
                                                placeholder="e.g name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="">
                                            <label
                                                htmlFor="inputDates"
                                                className="form-label">
                                                {content.searchLabelGuest ||
                                                    'GUEST'}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputDates"
                                                placeholder="e.g name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="">
                                            <label
                                                htmlFor="inputDates"
                                                className="form-label">
                                                COLLECTIONS
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputDates"
                                                placeholder="e.g name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-auto">
                                        <BtnPrimary
                                            type="button"
                                            className="rounded-pill">
                                            {content?.buttonText || 'SEARCH'}
                                        </BtnPrimary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionVillaHero
