import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'
import { getBoatDetail } from '@/service/api/boatTransfer.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import BoatTransferDetail from '@/page/boatTransfer/BoatTransferDetail'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'

const BoatTransferDetailTemplate = async ({ slug }: { slug?: string }) => {
    const dataBoat = await getBoatDetail(slug, 'tcBoatDetail').then((res) => {
        return res?.result || {}
    })

    const seo = dataBoat?.seo || {}

    return (
        <>
            <SEOBasicGeneral seo={seo} />
            <NavbarLayout isStartFix={false} />
            <SectionHeroHalfScreen
                content={{
                    title: dataBoat.name,
                    image: '',
                }}
            />
            <BoatTransferDetail detail={dataBoat} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default BoatTransferDetailTemplate
