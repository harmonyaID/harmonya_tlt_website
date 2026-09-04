import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const PropertyManagementPage = () => {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'Property Management',
                    image: BGHero,
                }}
            />

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default PropertyManagementPage
