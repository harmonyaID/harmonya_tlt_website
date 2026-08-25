import RenderHtml from '@/component/general/RenderHtml'
import { PropsSectionContent } from '@/type/sectionContent.type'
import Link from 'next/link'
import Image from 'next/image'
import { IMAGE_EMPTY } from '@/config/asset.config'

const SectionHomeNeighbourhoods = ({ content = {} }: PropsSectionContent) => {
    console.log('content: ', content)

    const contentItems = content?.items || []

    return (
        <section className="section-space-small overflow-hidden">
            <div className="container">
                <RenderHtml
                    className="wp-general-content-head-and-desc"
                    html={content?.content || ''}
                />

                <div className="row g-4 wrap-row">
                    {contentItems.map((vm: any, index: number) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <Link
                                    className="w-100 vstack gap-3 text-grey-200 wp-hover-image"
                                    href={vm.buttonLink || '#'}>
                                    <div className="section-blog-banner-reel">
                                        <Image
                                            src={vm?.image || IMAGE_EMPTY}
                                            alt={vm.title}
                                            fill
                                            className="object-fit-cover"
                                            // className="object-cover"
                                        />
                                    </div>

                                    <div className="">
                                        <p className="fs-24 wp-font-tt-drugs desc-two-line">
                                            {vm.title}
                                        </p>
                                        <p className="fs-13 wp-font-tt-drugs">
                                            {vm.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default SectionHomeNeighbourhoods
