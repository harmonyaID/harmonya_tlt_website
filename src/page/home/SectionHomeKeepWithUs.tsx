import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { BtnLinkBasic } from '@/component/general/Button'
import Image from 'next/image'
import KeepUp01 from '@/asset/image/home/home-keep-up-01.jpg'
import KeepUp02 from '@/asset/image/home/home-keep-up-02.jpg'
import KeepUp03 from '@/asset/image/home/home-keep-up-03.jpg'

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

const SectionHomeKeepWithUs = () => {
    return (
        <SectionGeneral className="container">
            <div className="hstack flex-wrap justify-content-between gap-3">
                <SectionTitle>KEEP UP WITH US</SectionTitle>

                <BtnLinkBasic className="btn-outline-grey-100 font-tt-drugs rounded-pill">
                    More Articles
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
