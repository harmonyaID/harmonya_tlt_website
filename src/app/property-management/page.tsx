import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import PropertyManagementMain from '@/page/propertyManagement/PropertyManagementMain'
import contentPropertyManagement from '@/app/property-management/contentPropertyManagement'
import contentSEO from '@/app/property-management/contentSEO'
import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'

const PropertyManagementPage = () => {
    return (
        <>
            <SEOBasicGeneral seo={contentSEO} />
            <PropertyManagementMain content={contentPropertyManagement} />
        </>
    )
}

export default PropertyManagementPage
