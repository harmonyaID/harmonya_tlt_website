import {
    CarouselDefaultWrap,
    CarouselItem,
} from '@/component/general/CarouselDefault'
import Image from 'next/image'
import { imgLandscapeConfig } from '@/config/urlImage.config'
import RenderHtml from '@/component/general/RenderHtml'
import { BtnLinkPrimary } from '@/component/general/Button'

const CarouselPortfolio = ({ items = [] }: { items?: any[] }) => {
    return (
        <>
            <CarouselDefaultWrap className="slide">
                {items?.map((vm, index) => (
                    <CarouselItem
                        key={index}
                        className="position-relative overflow-hidden section-home-carousel-book-banner"
                        isActive={index < 1}>
                        {/*<div className="position-absolute">*/}
                        <Image
                            src={imgLandscapeConfig(vm?.backgroundImage)}
                            className="position-absolute banner-image"
                            alt={vm.title || ''}
                            fill
                        />
                        {/*</div>*/}

                        <div className="banner-wp-content-text">
                            <div className="container position-relative z-1">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5 text-center text-white">
                                        <div className="vstack gap-5">
                                            {/*<p className="fs-20 font-tt-drugs mb-0">*/}
                                            {/*    {vm.label}*/}
                                            {/*</p>*/}
                                            {/*<div className="">*/}
                                            {/*    <RenderHtml*/}
                                            {/*        className="fw-light"*/}
                                            {/*        html={vm.content}*/}
                                            {/*    />*/}
                                            {/*</div>*/}

                                            <div className="wp-font-tt-drugs text-uppercase">
                                                <h5 className="fw-light fs-40">
                                                    {vm.title}
                                                </h5>
                                            </div>
                                            <div className="px-lg-5">
                                                <p className="fs-20 fw-light">
                                                    {vm.description}
                                                </p>
                                            </div>

                                            {/*<div className="">*/}
                                            {/*    <BtnLinkPrimary*/}
                                            {/*        className="rounded-pill"*/}
                                            {/*        isIconArrow*/}
                                            {/*        href={vm.buttonLink}>*/}
                                            {/*        {vm.buttonText}*/}
                                            {/*    </BtnLinkPrimary>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselDefaultWrap>
        </>
    )
}

export default CarouselPortfolio
