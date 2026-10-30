import { PropsSectionContent } from '@/type/sectionContent.type'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import AboutUsMain from '@/page/about/AboutUsMain'

const AboutUsTemplate = async ({ content }: PropsSectionContent) => {
    const { SECTION1, SECTION2, SECTION3, SECTION4 } = content?.content || {}

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1?.title || '',
                    image: SECTION1?.backgroundImage || '',
                }}
            />
            <section className="container py-4">
                <Breadcrumb />
            </section>
            <AboutUsMain
                SECTION2={SECTION2}
                SECTION3={SECTION3}
                SECTION4={SECTION4}
            />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default AboutUsTemplate
