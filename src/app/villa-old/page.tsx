import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionVillaHero from '@/page/villa/SectionVillaHero'
import SectionVillaProperty from '@/page/villa/SectionVillaProperty'
import SectionVillaFeatureStay from '@/page/villa/SectionVillaFeatureStay'
import FooterNewsLetterLayout from '@/component/layout/FooterNewsLetter.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionVillaFeatureOffer from '@/page/villa/SectionVillaFeatureOffer'

const Villa = () => {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionVillaHero />
            <SectionVillaProperty />
            <SectionVillaFeatureStay />
            <SectionVillaFeatureOffer />
            <FooterNewsLetterLayout />
            <FooterLayout />
        </>
    )
}

export default Villa
