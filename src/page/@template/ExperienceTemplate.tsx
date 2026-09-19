import { PropsSectionContent } from '@/type/sectionContent.type'
import { getListExpTypes } from '@/service/api/experience.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import BGHero from '@/asset/image/dummy/exp-bg-demo-half-screen.jpg'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import SectionExpMain from '@/page/experience/SectionExpMain'
import RenderHtml from '@/component/general/RenderHtml'
import SectionExpDataInfo from '@/page/experience/SectionExpDataInfo'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const ExperienceTemplate = async ({ content }: PropsSectionContent) => {
    const typeExperiences = await getListExpTypes({ limit: 50, page: 1 }).then(
        (res) => res?.result || {},
    )

    const { SECTION1, SECTION2 } = content?.content || {}

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1.title,
                    image: SECTION1.backgroundImage,
                }}
            />
            <SectionExpDataInfo content={SECTION2} />

            <SectionExpMain list={typeExperiences} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceTemplate
