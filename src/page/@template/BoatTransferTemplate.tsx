import { PropsSectionContent } from '@/type/sectionContent.type'
import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import Breadcrumb from '@/component/general/Breadcrumb'
import BoatTransferMain from '@/page/boatTransfer/BoatTransferMain'
import FooterLayout from '@/component/layout/Footer.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'

const BoatTransferTemplate = async ({ content }: PropsSectionContent) => {
    const { SECTION1, SECTION2, SECTION3 } = content?.content || {}

    return (
        <>
            <SEOBasicGeneral seo={content?.seo || {}} />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1.title,
                    image: SECTION1.backgroundImage,
                }}
            />
            <section className="container py-4">
                <Breadcrumb />
            </section>
            <NavbarLayout isBgTransparent />
            <BoatTransferMain SECTION2={SECTION2} SECTION3={SECTION3} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default BoatTransferTemplate
