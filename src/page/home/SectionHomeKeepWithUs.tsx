import SectionGeneral from '@/component/general/SectionGeneral'
import { BtnLinkBasic, IconArrowGray } from '@/component/general/Button'
import Image from 'next/image'
import KeepUp01 from '@/asset/image/home/home-keep-up-01.jpg'
import KeepUp02 from '@/asset/image/home/home-keep-up-02.jpg'
import KeepUp03 from '@/asset/image/home/home-keep-up-03.jpg'
import { PropsSectionContent } from '@/type/sectionContent.type'
import RenderHtml from '@/component/general/RenderHtml'

const CardImage = ({
    src,
    alt = 'the lembongan',
}: {
    src?: any
    alt?: string
}) => {
    return (
        <div className="position-relative">
            <Image src={src} className="object-fit-cover w-100" alt={alt} />
        </div>
    )
}

const SectionHomeKeepWithUs = ({ content = {} }: PropsSectionContent) => {
    return (
        <SectionGeneral className="container">
            <div className="hstack flex-wrap justify-content-between gap-3">
                {/*<SectionTitle>KEEP UP WITH US</SectionTitle>*/}

                <RenderHtml
                    className="wp-font-tt-drugs text-grey-200"
                    html={content.content || ''}
                />

                <BtnLinkBasic className="btn-outline-grey-100 font-tt-drugs rounded-pill hover-icon-white">
                    <div className="hstack align-items-center gap-1">
                        More Articles <IconArrowGray />
                    </div>
                </BtnLinkBasic>
            </div>

            <div className="row pt-5 g-4">
                <div className="col-lg-3 col-md-6">
                    <CardImage src={KeepUp02} alt="keep 01" />
                </div>
                <div className="col-lg-3 col-md-6">
                    <CardImage src={KeepUp01} alt="keep 01" />
                </div>
                <div className="col-lg-6">
                    <CardImage src={KeepUp03} alt="keep 01" />
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeKeepWithUs
