import { PropsSectionContent } from '@/type/sectionContent.type'
import FooterLayout from '@/component/layout/Footer.layout'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import PressAndMediaList from '@/page/pressAndMedia/PressAndMediaList'
import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'

const PressAndMediaTemplate = async ({
    content,
    slug = '',
}: PropsSectionContent & { slug?: string }) => {
    const { SECTION1 = {} } = content?.content || {}

    return (
        <>
            <SEOBasicGeneral seo={content?.seo || {}} />
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1.title || '',
                    image: SECTION1.backgroundImage,
                }}
            />
            <PressAndMediaList />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default PressAndMediaTemplate
