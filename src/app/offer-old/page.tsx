import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import BGHero from '@/asset/image/dummy/offer-bg-hero-half.jpg'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionOfferMainInfo from '@/page/offer/SectionOfferMainInfo'
import { getListOffers } from '@/service/api/offer.api'

const OfferPage = async () => {
    const page = 1

    const { list = [], pagination = {} } = await getListOffers({
        page,
        limit: 12,
    }).then((res) => {
        return {
            list: res?.result || [],
            pagination: res?.pagination || {},
        }
    })

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'OFFERS',
                    image: BGHero,
                }}
            />
            <SectionOfferMainInfo list={list} pagination={pagination} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default OfferPage
