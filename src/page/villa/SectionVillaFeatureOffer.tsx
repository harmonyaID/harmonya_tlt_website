import SectionGeneral from '@/component/general/SectionGeneral'
import { H3, SectionTitle } from '@/component/text/Heading'
import Image from 'next/image'
import PropertyVilla01 from '@/asset/image/villa/villa-offers-01.jpg'
import PropertyVilla02 from '@/asset/image/villa/villa-offers-02.jpg'
import { SectionDescription } from '@/component/text/Paragraph'
import { BtnLinkBasic } from '@/component/general/Button'
import { ReactNode } from 'react'

const objDataOffer = (title?: string, description?: string, image?: any) => ({
    description,
    title,
    image,
})

const SectionVillaFeatureOffer = () => {
    const offers = [
        objDataOffer(
            'BOOK IN ADVANCE',
            'Inspired by the carefree spirit of the Australian beach house, Capella Lodge has nine contemporary, island-styled suites ',
            PropertyVilla01,
        ),
        objDataOffer(
            'LAST MINUTE GATEWAY',
            'Inspired by the carefree spirit of the Australian beach house, Capella Lodge has nine contemporary, island-styled suites ',
            PropertyVilla02,
        ),
    ]

    return (
        <>
            <SectionGeneral>
                <div className="container">
                    <SectionTitle className="text-center pb-5 font-tt-drugs">
                        FEATURE OFFERS
                    </SectionTitle>

                    <div className="row gx-5">
                        {offers.map((vm, index) => {
                            return (
                                <div className="col-md-6" key={index}>
                                    <Image
                                        src={vm.image}
                                        alt="bali"
                                        className="w-100 h-auto"
                                    />
                                    <H3 className="font-tt-drugs text-grey-200 mt-4">
                                        {vm.title}
                                    </H3>

                                    <SectionDescription className="font-tt-drugs">
                                        {vm.description}
                                    </SectionDescription>

                                    <BtnLinkBasic className="rounded-pill btn-outline-neutral-400 mt-4">
                                        EXPLORE DETAILS
                                    </BtnLinkBasic>
                                </div>
                            )
                        })}
                    </div>

                    {/*<div className="row gx-3">*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <Image*/}
                    {/*            src={PropertyVilla01}*/}
                    {/*            alt="bali"*/}
                    {/*            className="w-100 h-auto"*/}
                    {/*        />*/}
                    {/*        <H3 className="font-tt-drugs text-grey-200 mt-4">*/}
                    {/*            Last minute gateaway*/}
                    {/*        </H3>*/}

                    {/*        <SectionDescription className="font-tt-drugs">*/}
                    {/*            Inspired by the carefree spirit of the*/}
                    {/*            Australian beach house, Capella Lodge has nine*/}
                    {/*            contemporary, island-styled suites*/}
                    {/*        </SectionDescription>*/}

                    {/*        <BtnLinkBasic className="rounded-pill btn-outline-neutral-400 mt-4">*/}
                    {/*            EXPLORE DETAILS*/}
                    {/*        </BtnLinkBasic>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <Image*/}
                    {/*            src={PropertyVilla02}*/}
                    {/*            alt="bali"*/}
                    {/*            className="w-100 h-auto"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </SectionGeneral>
        </>
    )
}

export default SectionVillaFeatureOffer
