import NavbarLayout from '@/component/layout/Navbar.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroSecondSmall from '@/component/general/SectionHeroSecondSmall'
import { getDetailExpArea } from '@/service/api/experience.api'
import ExpMainList from '@/page/experience/container/ExpMainList'

const ExperienceDetailLevel2Template = async ({
    slug,
    allSlug = [],
}: {
    slug: string
    allSlug?: any
}) => {
    const areaDetail = await getDetailExpArea(slug, 'tcGetDetailExpArea').then(
        (res) => res?.result || {},
    )

    console.log('areaDetail: ', areaDetail)

    const { name, banner, id, type, featuredImage } = areaDetail || {}

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

            <ExpMainList
                title="ALL Restaurants"
                className="pt-5"
                configSearch={{
                    typeId: type?.id || '',
                    areaId: id,
                }}
                isOnlyPathname
            />

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceDetailLevel2Template
