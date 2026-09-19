import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import BGHero from '@/asset/image/dummy/default-bg-contact.jpg'
import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroSecond from '@/component/general/SectionHeroSecond'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import SectionHeroSecondInfo from '@/component/general/SectionHeroSecondInfo'
import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'

const ExperienceDetailTemplate = () => {
    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecondInfo
                content={{
                    title: 'Eat',
                    image: BGHero,
                }}
            />
            <div className="container">
                <div className="pt-4">
                    <Breadcrumb />
                </div>
            </div>

            <section className="section-space-small">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs text-uppercase text-grey-200"
                                html={'<h3>Neighbourhood</h3>'}
                            />
                        </div>

                        <div className="col-md-6">
                            <p className="fs-20 text-grey-400">
                                Whether you're looking for somewhere nearby or
                                venturing to a new neighbourhood for a change of
                                scene, our EAT guide helps you discover the best
                                restaurants and places to eat across Nusa
                                Lembongan and Nusa Ceningan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceDetailTemplate
