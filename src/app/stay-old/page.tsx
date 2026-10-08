import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionPropertyHero from '@/page/property/SectionPropertyHero'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionListProperty from '@/page/property/SectionListProperty'
import SectionPropertyHighlight from '@/page/property/SectionPropertyHighlight'
import SectionPropertyOffer from '@/page/property/SectionPropertyOffer'
import { getListOffers } from '@/service/api/offer.api'

const StayPage = async () => {
    const offers = await getListOffers({ limit: 2, page: 1 }).then(
        (res) => res?.result || {},
    )

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionPropertyHero />
            <SectionListProperty />
            <SectionPropertyHighlight />
            <SectionPropertyOffer list={offers} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default StayPage
