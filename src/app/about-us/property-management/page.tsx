import AboutUsPropertyManagement from '@/page/about/AboutUsPropertyManagement'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import Breadcrumb from '@/component/general/Breadcrumb'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import PropertyManagementForm from '@/page/propertyManagement/container/PropertyManagementForm'

const AboutPropertyManagementPage = () => {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'PROPERTY MANAGEMENT',
                    image: BGHero,
                }}
            />
            <section className="container py-4">
                <Breadcrumb />
            </section>
            <AboutUsPropertyManagement />
            <PropertyManagementForm
                content={{
                    title: "Let's Talk About Your Property ",
                    description:
                        "Whether you're preparing a new villa for the market, looking for a new management partner or want to improve the performance of an existing property, we'd love to hear from you. \n",
                }}
            />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default AboutPropertyManagementPage
