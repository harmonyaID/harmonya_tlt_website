import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import { getPropertyDetail } from '@/service/api/property.api'
import PropertyDetail from '@/page/property/PropertyDetail'
import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'

const PropertyDetailTemplate = async ({
    slug,
    allSlug,
}: {
    slug: string
    allSlug?: any
}) => {
    const dataProperty = await getPropertyDetail(
        slug,
        'tcGetPropertyDetail',
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

export default PropertyDetailTemplate
