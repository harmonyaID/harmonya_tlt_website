import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import { getBlogDetail } from '@/service/api/blog.api'
import { getPropertyDetail } from '@/service/api/property.api'
import PropertyDetail from '@/page/property/PropertyDetail'

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

    return (
        <>
            <NavbarLayout isStartFix={false} />
            <PropertyDetail detail={dataProperty} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default PropertyDetailTemplate
