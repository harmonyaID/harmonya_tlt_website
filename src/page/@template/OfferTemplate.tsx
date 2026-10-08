import { PropsSectionContent } from '@/type/sectionContent.type'
import { getListOffers } from '@/service/api/offer.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import SectionOfferMainInfo from '@/page/offer/SectionOfferMainInfo'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const OfferTemplate = async ({
    content,
    slug = '',
}: PropsSectionContent & { slug?: string }) => {
    const { SECTION1 = {}, SECTION2 = {} } = content?.content || {}

    const page = 1

    const { list = [], pagination = {} } = await getListOffers({
        page,
        limit: 12,
        isActive: true,
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
                    title: SECTION1.title || 'OFFERS',
                    image: SECTION1.backgroundImage,
                }}
            />
            <SectionOfferMainInfo
                content={SECTION2}
                list={list}
                pagination={pagination}
                basicSlug={slug}
            />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default OfferTemplate
