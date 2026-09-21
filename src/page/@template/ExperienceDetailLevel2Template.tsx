import NavbarLayout from '@/component/layout/Navbar.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroSecondSmall from '@/component/general/SectionHeroSecondSmall'
import { getDetailExpArea } from '@/service/api/experience.api'

const ExperienceDetailLevel2Template = async ({ slug }: { slug?: string }) => {
    const areaDetail = await getDetailExpArea('10', 'tcGetDetailExpArea').then(
        (res) => res?.result || {},
    )

    console.log('areaDetail: ', areaDetail)

    const { name, banner, featuredImage } = areaDetail || {}

    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecondSmall
                content={{
                    title: name,
                    image: featuredImage,
                }}
            />

            <div className="container">
                <div className="pt-4">
                    <Breadcrumb />
                </div>
            </div>

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceDetailLevel2Template
