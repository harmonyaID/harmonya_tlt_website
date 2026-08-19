import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import IconCircle from '@/asset/image/home/home-icon-circle.png'
import Image from 'next/image'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'

const _shapeData = (title: string, description: string) => ({
    title,
    description,
})

const SectionHomeWhyBookUs = ({ content = {} }: PropsSectionContent) => {
    const points = [
        _shapeData(
            'FULL PACKAGE EXPERIENCE',
            'We handle the entire trip from villa booking, boat transfers from Sanur, and on-island support.',
        ),
        _shapeData(
            'PRICE MATCH ALL ONLINE AGENTS',
            'An Australian-owned business. We personally inspect every property and match any lower price online.',
        ),
        _shapeData(
            'ACCOMMODATION TO SUIT ALL BUDGETS',
            'Boutique bungalows to beachfront villas, handpicked stay across Lembongan and Ceningan.',
        ),
        _shapeData(
            'LEMBONGAN OFFICE OPEN 7 DAYS',
            'Our Jungutbatu office is open daily for local advice, villa booking and on-island support.',
        ),
    ]

    return (
        <SectionGeneral className="bg-green-500">
            <div className="container text-center">
                {/*<SectionTitle className="text-white pb-5 font-tt-drugs text-uppercase">*/}
                {/*    Why Book with us?*/}
                {/*</SectionTitle>*/}
                <RenderHtml
                    className="text-white pb-5 font-tt-drugs text-uppercase"
                    html={content.content}
                />

                <div className="row g-5 text-white pt-4">
                    {content?.items?.map((vm: any, key: number) => (
                        <div className="col-lg-3 vstack gap-3 px-5" key={key}>
                            <div className="">
                                <Image
                                    src={vm.icon || IconCircle}
                                    className=""
                                    alt="image"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <p className="fs-18 mb-0 font-tt-drugs text-uppercase">
                                {vm.title}
                            </p>
                            <p className="fs-14 fw-light mb-0">
                                {vm.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeWhyBookUs
