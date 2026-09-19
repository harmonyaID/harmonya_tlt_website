import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import BGHero from '@/asset/image/propertyManagement/hero-bg-property-management.jpg'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'

const PropertyManagementMain = () => {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'Property Management',
                    image: BGHero,
                }}
            />

            <FooterLayout />
        </>
    )
}

export default PropertyManagementMain
