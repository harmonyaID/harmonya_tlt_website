import { imgLandscapeConfig } from '@/config/urlImage.config'
import Image from 'next/image'

const SectionHeroSecondSmall = ({ content = {} }: { content?: any | {} }) => {
    return (
        <>
            <section className="section-hero-second-small">
                <div className="general-hero-full-screen">
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
                <div className="container content-hero-position-centerP content-hero-data-text-center z-1">
                    <div className="text-white wp-font-tt-drugs text-center text-uppercase">
                        <h1 className="fw-light">{content.title}</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionHeroSecondSmall
