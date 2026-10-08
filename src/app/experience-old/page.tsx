import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import BGHero from '@/asset/image/dummy/exp-bg-demo-half-screen.jpg'
import SectionExpMain from '@/page/experience/SectionExpMain'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import { getListExpTypes } from '@/service/api/experience.api'

const Experience = async () => {
    const typeExperiences = await getListExpTypes({ limit: 50, page: 1 }).then(
        (res) => res?.result || {},
    )

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'EXPERIENCES',
                    image: BGHero,
                }}
            />

            <SectionExpMain list={typeExperiences} />

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default Experience
