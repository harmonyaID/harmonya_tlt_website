import SectionGeneral from '@/component/general/SectionGeneral'
import { H3, SectionTitle } from '@/component/text/Heading'
import Image from 'next/image'
import { SectionDescription } from '@/component/text/Paragraph'
import { BtnIcon, BtnLinkBasic } from '@/component/general/Button'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import { isEmpty } from 'lodash'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import Link from 'next/link'
import RenderHtml from '@/component/general/RenderHtml'
import { OFFER_SLUG_PATH } from '@/config/pagePath.config'

const SectionPropertyOffer = ({ list = [] }: { list?: [] }) => {
    console.log('list: ', list)
    return (
        <>
            <SectionGeneral>
                <div className="container">
                    <SectionTitle className="text-center pb-5 font-tt-drugs">
                        FEATURE OFFERS
                    </SectionTitle>

                    {!isEmpty(list) ? (
                        <div className="row gx-5">
                            {list?.map((vm: any, index) => {
                                return (
                                    <div className="col-md-6" key={index}>
                                        <WrapImageHoverOverlay className="h-320-px w-100">
                                            <Image
                                                // src={vm.image}
                                                src={imgReelConfig(
                                                    vm.thumbnail,
                                                )}
                                                alt={vm.title}
                                                fill
                                                className="object-fit-cover"
                                            />
                                        </WrapImageHoverOverlay>
                                        <h4 className="wp-font-tt-drugs font-tt-drugs desc-two-line text-neutral-900 mt-4">
                                            {vm.title}
                                        </h4>

                                        {/*<SectionDescription className="font-tt-drugs">*/}
                                        {/*    {vm.description}*/}
                                        {/*</SectionDescription>*/}

                                        <RenderHtml
                                            html={vm.excerpt}
                                            className="mb-3 text-grey-400 fs-13"
                                        />

                                        <BtnLinkBasic
                                            href={
                                                vm.slug
                                                    ? OFFER_SLUG_PATH + vm.slug
                                                    : '#'
                                            }
                                            className="rounded-pill btn-outline-grey-100 mt-4">
                                            <BtnIcon>EXPLORE DETAILS</BtnIcon>
                                        </BtnLinkBasic>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <InfoNotAvailable />
                    )}
                </div>
            </SectionGeneral>
        </>
    )
}

export default SectionPropertyOffer
