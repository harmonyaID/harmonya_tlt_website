import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import FooterLayout from '@/component/layout/Footer.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'

const OfferPage = () => {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'Last minute gateaway',
                    image: BGHero,
                }}
            />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default OfferPage
