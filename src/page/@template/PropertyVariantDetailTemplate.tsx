import { getPropertyDetail } from '@/service/api/property.api'
import { getPropertyVariantDetail } from '@/service/api/propertyVariant.api'
import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'
import NavbarLayout from '@/component/layout/Navbar.layout'
import PropertyDetail from '@/page/property/PropertyDetail'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const PropertyVariantDetailTemplate = async ({
    slug,
    allSlug,
}: {
    slug: string
    allSlug?: any
}) => {
    const dataProperty = await getPropertyVariantDetail(
        slug,
        'tcGetPropertyVariantDetail',
    ).then((res) => res?.result || {})

    const seo = dataProperty?.seo || {}

    return (
        <>
            <SEOBasicGeneral seo={seo} />
            <NavbarLayout isStartFix={false} />
            <PropertyDetail detail={dataProperty} allSlug={allSlug} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default PropertyVariantDetailTemplate
