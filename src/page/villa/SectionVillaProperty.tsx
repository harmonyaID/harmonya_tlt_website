'use client'
import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionDescription } from '@/component/text/Paragraph'
import { SectionTitle } from '@/component/text/Heading'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import PropertyResort01 from '@/asset/image/villa/property-resort-01.png'
import PropertyResort02 from '@/asset/image/villa/property-resort-02.png'
import Image from 'next/image'
import { isEmpty } from 'lodash'

const otherInfo = (bad: '', guest: '', dineIn: true, pool: true) => ({
    bad,
    guest,
    dineIn,
    pool,
})

const infoProperty = (
    image: any,
    name = '',
    category = '',
    location = '',
    tags = '',
    otherInfo = {},
    isBestPrice = false,
    isNewResort = false,
) => ({
    name,
    category,
    location,
    image,
    tags,
    isBestPrice,
    isNewResort,
    otherInfo,
})

const VILLA = 'Villa'
const RESORT = 'Resort'

const SectionVillaProperty = () => {
    const properties = [
        //@ts-ignore
        infoProperty(PropertyVilla01, 'VILLA TANJUNG', VILLA, 'Jungutbatu', [
            'Family Friendly',
            'Guest’s Favorite',
        ]),
        infoProperty(
            PropertyResort01,
            'THE WHITE HORSE RESORT',
            RESORT,
            'Jungutbatu',
            //@ts-ignore
            ['Family Friendly', 'Guest’s Favorite'],
        ),
        infoProperty(
            PropertyResort02,
            'THE WHITE HORSE RESORT',
            RESORT,
            'Jungutbatu',
            //@ts-ignore
            ['Family Friendly', 'Guest’s Favorite'],
        ),
    ]

    return (
        <SectionGeneral>
            <div className="container">
                <SectionTitle className="font-tt-drugs mb-5">
                    ALL PROPERTIES
                </SectionTitle>

                <div className="row gx-3 gy-4">
                    {properties.map((vm, index) => {
                        const tags = !isEmpty(vm.tags) ? vm.tags : []

                        return (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="overflow-hidden position-relative">
                                    <Image
                                        src={vm.image}
                                        alt={vm.name}
                                        className="w-100"
                                        height="460"
                                    />

                                    <div className="mt-3">
                                        <p className="fs-20 text-primary mb-0">
                                            {vm.category}
                                        </p>
                                        <p className="fs-24 mb-0 font-tt-drugs">
                                            {vm.name}
                                        </p>
                                        <p className="fs-14 mb-4">
                                            {vm.location}
                                        </p>

                                        <div className="hstack gap-2 flex-wrap">
                                            {/*@ts-ignore*/}
                                            {tags.map((tag, idx) => (
                                                <div
                                                    className="badge text-bg-green-100 rounded-pill fw-300"
                                                    key={idx}>
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionVillaProperty
