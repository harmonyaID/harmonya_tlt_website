import { getDetailIslandGuide } from '@/service/api/islandGuide.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroSecondSmall from '@/component/general/SectionHeroSecondSmall'
import SectionHeroSecondInfo from '@/component/general/SectionHeroSecondInfo'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import IslandGuideDetailMain from '@/page/islandGuide/IslandGuideDetailMain'

const IslandGuideDetailLevel2Template = async ({
    slug,
    allSlug = [],
}: {
    slug: string
    allSlug?: any
}) => {
    const islandGuideDetail = await getDetailIslandGuide(slug).then(
        (res) => res?.result || {},
    )

    const { name, thumbnail, id, type, featuredImage } = islandGuideDetail || {}

    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecondInfo
                content={{
                    title: name,
                    image: thumbnail,
                }}
            />
            <div className="container">
                <div className="pt-4">
                    <Breadcrumb />
                </div>
            </div>
            <IslandGuideDetailMain
                detail={islandGuideDetail}
                allSlug={allSlug}
            />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default IslandGuideDetailLevel2Template
