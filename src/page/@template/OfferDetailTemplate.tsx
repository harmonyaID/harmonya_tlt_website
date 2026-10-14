import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import SectionOfferDetail from '@/page/offer/SectionOfferDetail'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import { getDetailOffers } from '@/service/api/offer.api'

const OfferDetailTemplate = async ({ slug }: { slug: string }) => {
    const dataOffer = await getDetailOffers(slug, 'tcGetOfferDetail').then(
        (res) => res?.result || {},
    )

    console.log('dataOffer: ', dataOffer)

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: dataOffer?.title || '',
                    image: dataOffer?.thumbnail || '',
                }}
            />
            <SectionOfferDetail detail={dataOffer} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default OfferDetailTemplate
