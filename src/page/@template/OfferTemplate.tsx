import { PropsSectionContent } from '@/type/sectionContent.type'
import { getListOffers } from '@/service/api/offer.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import BGHero from '@/asset/image/dummy/offer-bg-hero-half.jpg'
import SectionOfferMainInfo from '@/page/offer/SectionOfferMainInfo'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const OfferTemplate = async ({ content }: PropsSectionContent) => {
    console.log('content: ', content)
    const { SECTION1 = {}, SECTION2 = {} } = content?.content || {}

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

export default OfferTemplate
