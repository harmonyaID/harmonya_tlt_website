import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'

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
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default IslandGuideAboutTheIslandTemplate
