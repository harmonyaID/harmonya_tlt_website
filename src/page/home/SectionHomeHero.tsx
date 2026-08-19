import HomeBanner from '@/asset/image/home/home-banner.jpg'
import Image from 'next/image'
import { BtnPrimary } from '@/component/general/Button'

const SectionHomeHero = ({ content = {} }: { content?: any | {} }) => {
    return (
        <section className="section-hero-general bg-green-800">
            <Image
                // src={content.videoThumbnail || HomeBanner}
                src={HomeBanner}
                className="object-fit-cover w-100 h-100 position-absolute banner-image"
                alt="Home Banner"
            />

            {/*Title*/}
            <div className="container content-hero-position-default text-center z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-9 text-white">
                        <div
                            className="wp-font-tt-drugs"
                            dangerouslySetInnerHTML={{
                                __html:
                                    content?.content ||
                                    '<h1>Your Nusa Lembongan Story Starts Here</h1>',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/*Search*/}
            <div className="container content-hero-position-bottom z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="content-hero-search-card text-white p-3 rounded-3">
                            <div className="row align-items-end g-4">
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
                                            placeholder={
                                                content.searchPlaceholderDates ||
                                                'e.g name'
                                            }
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
                                            placeholder={
                                                content.searchPlaceholderGuest ||
                                                'e.g name'
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="">
                                        <label
                                            htmlFor="inputDates"
                                            className="form-label">
                                            {content?.searchLabelCollection ||
                                                'COLLECTIONS'}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputDates"
                                            placeholder={
                                                content?.searchPlaceholderCollection ||
                                                'e.g Placeholder'
                                            }
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
    )
}

export default SectionHomeHero
