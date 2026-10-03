import { PropsSectionContent } from '@/type/sectionContent.type'
import { getListIslandGuideTypes } from '@/service/api/islandGuide.api'
import { getListExpTypes } from '@/service/api/experience.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHorizontalTitleAndDesc from '@/component/section/SectionHorizontalTitleAndDesc'
import IslandGuideTypeList from '@/page/islandGuide/container/IslandGuideTypeList'

const IslandGuideTemplate = async ({ content }: PropsSectionContent) => {
    const typeislandGuides = await getListIslandGuideTypes({
        // limit: 50,
        // page: 1,
    }).then((res) => res?.result || {})

    const { SECTION1, SECTION2 } = content?.content || {}

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1?.title || '',
                    image: SECTION1?.backgroundImage || '',
                }}
            />
            <SectionHorizontalTitleAndDesc
                title={SECTION2?.title || ''}
                description={SECTION2?.description || ''}
            />
            <IslandGuideTypeList list={typeislandGuides} />

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default IslandGuideTemplate
