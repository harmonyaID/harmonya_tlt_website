import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import IslandGuideAboutTheIsland from '@/page/islandGuide/IslandGuideAboutTheIsland'
import WhatsAppChat from '@/component/general/WhatsappChat'

const IslandGuideAboutTheIslandTemplate = async ({
    content,
}: {
    content: any
}) => {
    const { SECTION1 } = content?.content || {}

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1.title,
                    image: SECTION1.backgroundImage,
                }}
            />
            <section className="container py-4">
                <Breadcrumb />
            </section>
            <IslandGuideAboutTheIsland content={content} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default IslandGuideAboutTheIslandTemplate
