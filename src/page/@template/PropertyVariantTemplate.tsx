import { PropsSectionContent } from '@/type/sectionContent.type'
import { getListOffers } from '@/service/api/offer.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionPropertyHero from '@/page/property/SectionPropertyHero'
import SectionListProperty from '@/page/property/SectionListProperty'
import SectionPropertyHighlight from '@/page/property/SectionPropertyHighlight'
import SectionPropertyOffer from '@/page/property/SectionPropertyOffer'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import PropertyVariantMain from '@/page/propertyVariant/PropertyVariantMain'

const PropertyVariantTemplate = async ({ content }: PropsSectionContent) => {
    const { SECTION1 = {}, SECTION2 = {} } = content?.content || {}

    console.log('content: ', content)

    const offers = await getListOffers({ limit: 2, page: 1 }).then(
        (res) => res?.result || {},
    )

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionPropertyHero content={SECTION1} />
            {/*<SectionListProperty />*/}
            <PropertyVariantMain />
            <SectionPropertyHighlight />
            <SectionPropertyOffer list={offers} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default PropertyVariantTemplate
