import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import NavbarLayout from '@/component/layout/Navbar.layout'
import BGHero from '@/asset/image/dummy/exp-bg-demo-half-screen.jpg'

const Experience = () => {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHeroHalfScreen
                content={{
                    title: 'EXPERIENCES',
                    image: BGHero,
                }}
            />
        </>
    )
}

export default Experience
