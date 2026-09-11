'use client'

import SectionGeneral from '@/component/general/SectionGeneral'
import IconCircle from '@/asset/image/home/home-icon-circle.png'
import Image from 'next/image'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'

const SectionHomeWhyBookUs = ({ content = {} }: PropsSectionContent) => {
    return (
        <SectionGeneral className="bg-green-500">
            <div className="container text-center">
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
