import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const NotFoundPage = () => {
    return (
        <>
            <NavbarLayout />
            <section className="section-space bg-white">
                <div className="container pt-5 mt-5 text-center">
                    <h1 className="font-tt-drugs">404 - Page Not Found</h1>
                </div>
            </section>
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default NotFoundPage
