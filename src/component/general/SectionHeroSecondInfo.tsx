import Image from 'next/image'
import { imgLandscapeConfig } from '@/config/urlImage.config'

const SectionHeroSecondInfo = ({ content = {} }: { content?: any | {} }) => {
    return (
        <>
            <section className="section-hero-second-info">
                <div className="background-image">
                    <Image
                        src={imgLandscapeConfig(content.image)}
                        className="h-100 banner-image"
                        alt={
                            content.title ||
                            'The Lembongan Traveller - Your Guide to Nusa Lembongan'
                        }
                        fill
                    />
                </div>

                {/*Title*/}
                <div className="container content-hero-position-full-centerP content-hero-data-text-center z-1">
                    <div className="vstack justify-content-center align-items-center h-100">
                        <div className="text-white wp-font-tt-drugs text-center text-uppercase">
                            <h1 className="fw-light">{content.title}</h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionHeroSecondInfo
