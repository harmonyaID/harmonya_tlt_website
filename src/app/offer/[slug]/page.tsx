import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import FooterLayout from '@/component/layout/Footer.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import SectionOfferDetail from '@/page/offer/SectionOfferDetail'

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
            <SectionOfferDetail />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default OfferPage
