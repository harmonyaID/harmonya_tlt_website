import SectionGeneral from '@/component/general/SectionGeneral'
import RenderHtml from '@/component/general/RenderHtml'
import { BtnLinkPrimary } from '@/component/general/Button'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import BannerEat from '@/asset/image/dummy/exp-eat.jpg'
import BannerPlay from '@/asset/image/dummy/exp-play.jpg'
import BannerWellness from '@/asset/image/dummy/exp-wellness.jpg'

interface BlockInfoProps {
    title?: string
    subTitle?: string
    description?: string
    link?: string
    buttonName?: string
}

const BlockInfo = ({
    title,
    subTitle,
    description,
    link = '#',
    buttonName = 'DISCOVER MORE',
}: BlockInfoProps) => {
    return (
        <>
            <div className="pb-3P">
                <h5 className="fs-48 fw-light text-uppercase mb-2 text-grey-200">
                    {title}
                </h5>
                {/*<p className="fs-24 mb-0 text-uppercase text-grey-200">*/}
                {/*    {subTitle}*/}
                {/*</p>*/}
            </div>

            {/*<p className="fs-20 fw-light mb-3 text-grey-400 mb-4">*/}
            {/*    {description}*/}
            {/*</p>*/}
            <RenderHtml
                className="fs-20 text-grey-400 wp-head-font-tt-drugs mb-4"
                // @ts-ignore
                html={description}
            />

            <BtnLinkPrimary href={link} isIconArrow className="rounded-pill">
                {buttonName}
            </BtnLinkPrimary>
        </>
    )
}

const SectionImageAndContent = ({
    title,
    subTitle,
    description,
    link = '#',
    image,
}: BlockInfoProps & { image?: string }) => (
    <section className="section-space-small">
        <div className="container">
            <div className="row gx-8 gy-5 align-items-center">
                <div className="col-md-6">
                    <WrapImageHoverOverlay className="h-480-px">
                        <Image
                            src={image || IMAGE_EMPTY}
                            alt={
                                title || 'Adventure Awaits Beneath the Surface'
                            }
                            fill
                            className="object-fit-cover"
                            // className="object-cover"
                        />
                    </WrapImageHoverOverlay>
                </div>

                <div className="col-md-6">
                    <div className="pe-5">
                        <BlockInfo
                            title={title}
                            subTitle={subTitle}
                            description={description}
                            link={link || '#'}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const SectionContentAndImage = ({
    title,
    subTitle,
    description,
    link = '#',
    image,
}: BlockInfoProps & { image?: string }) => (
    <section className="section-space-small bg-neutral-100">
        <div className="container">
            <div className="row gx-8 gy-5 align-items-center">
                <div className="col-md-5">
                    <div className="pe-5">
                        <BlockInfo
                            title={title}
                            subTitle={subTitle}
                            description={description}
                            link={link || '#'}
                        />
                    </div>
                </div>

                <div className="col-md-7 ">
                    <WrapImageHoverOverlay className="h-480-px">
                        <Image
                            src={image || IMAGE_EMPTY}
                            alt={
                                title || 'Adventure Awaits Beneath the Surface'
                            }
                            fill
                            className="object-fit-cover"
                            // className="object-cover"
                        />
                    </WrapImageHoverOverlay>
                </div>
            </div>
        </div>
    </section>
)

const SectionExpMain = ({ list = [] }: { list?: any }) => {
    console.log('experiences: ', list)

    return (
        <>
            {/*Section 1*/}
            <section className="section-space-small">
                <div className="container">
                    <div className="row gx-8 gy-5">
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs fs-48 text-grey-200"
                                html={`<p>
                                        TURQUOISE WATER. QUIET BEACHES. SLOW
                                        DAYS.
                                    </p>`}
                            />
                        </div>
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs text-grey-400"
                                html={`<p>
                                        Whether you want to fill your days with
                                        adventure or simply spend the afternoon
                                        doing absolutely nothing, the choice is
                                        yours. From where to eat and play to the
                                        best places to explore, discover our
                                        favourite experiences across Nusa
                                        Lembongan and Nusa Ceningan.
                                    </p>`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {list.length > 0 ? (
                <>
                    {list.map((vm: any, index: number) => {
                        const number = index + 1
                        const isSectionImageAndContent = number % 2 !== 0

                        const dataProps = {
                            title: vm.name || '',
                            subTitle: '',
                            description: vm.description || '',
                            link: '',
                            image: vm.featuredImage || '',
                        }

                        if (isSectionImageAndContent) {
                            return (
                                <SectionImageAndContent
                                    key={index}
                                    {...dataProps}
                                />
                            )
                        }

                        return (
                            <SectionContentAndImage
                                key={index}
                                {...dataProps}
                            />
                        )
                    })}
                </>
            ) : null}

            {/*Section 2*/}
            {/*<section className="section-space-small">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row gx-8 gy-5 align-items-center">*/}
            {/*            <div className="col-md-6">*/}
            {/*                <WrapImageHoverOverlay className="h-480-px">*/}
            {/*                    <Image*/}
            {/*                        src={BannerEat || IMAGE_EMPTY}*/}
            {/*                        alt="Adventure Awaits Beneath the Surface"*/}
            {/*                        fill*/}
            {/*                        className="object-fit-cover"*/}
            {/*                        // className="object-cover"*/}
            {/*                    />*/}
            {/*                </WrapImageHoverOverlay>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6">*/}
            {/*                <div className="pe-5">*/}
            {/*                    <BlockInfo*/}
            {/*                        title="PLAY"*/}
            {/*                        subTitle="Adventure Awaits Beneath the Surface"*/}
            {/*                        description="From surfing, snorkelling and diving to yoga, wellness, shopping, spa days and beach clubs, Nusa Lembongan and Ceningan offer plenty to do on and off the water."*/}
            {/*                        link="#"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<section className="section-space-small bg-neutral-100">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row gx-8 gy-5 align-items-center">*/}
            {/*            <div className="col-md-5">*/}
            {/*                <div className="pe-5">*/}
            {/*                    <BlockInfo*/}
            {/*                        title="PLAY"*/}
            {/*                        subTitle="Adventure Awaits Beneath the Surface"*/}
            {/*                        description="From surfing, snorkelling and diving to yoga, wellness, shopping, spa days and beach clubs, Nusa Lembongan and Ceningan offer plenty to do on and off the water."*/}
            {/*                        link="#"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-7">*/}
            {/*                <WrapImageHoverOverlay className="h-480-px">*/}
            {/*                    <Image*/}
            {/*                        src={BannerPlay || IMAGE_EMPTY}*/}
            {/*                        alt="Adventure Awaits Beneath the Surface"*/}
            {/*                        fill*/}
            {/*                        className="object-fit-cover"*/}
            {/*                        // className="object-cover"*/}
            {/*                    />*/}
            {/*                </WrapImageHoverOverlay>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<section className="section-space-small">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row gx-8 gy-5 align-items-center">*/}
            {/*            <div className="col-md-6">*/}
            {/*                <WrapImageHoverOverlay className="h-480-px">*/}
            {/*                    <Image*/}
            {/*                        src={BannerWellness || IMAGE_EMPTY}*/}
            {/*                        alt="WELLNESS & RECOVERY"*/}
            {/*                        fill*/}
            {/*                        className="object-fit-cover"*/}
            {/*                        // className="object-cover"*/}
            {/*                    />*/}
            {/*                </WrapImageHoverOverlay>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6">*/}
            {/*                <div className="">*/}
            {/*                    <BlockInfo*/}
            {/*                        title="WELLNESS & RECOVERY"*/}
            {/*                        subTitle="Reshape Your Body, Renew Your Spirit"*/}
            {/*                        description="Slowing down comes naturally on these islands. But if you're looking for a more intentional way to unwind, there's plenty to choose from. Whether it's a fun padel session, post-surf yoga, sound healing, a pampering spa treatment or a sauna and ice bath session, Nusa Lembongan offers more wellness options than you might expect."*/}
            {/*                        link="#"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    )
}

export default SectionExpMain
