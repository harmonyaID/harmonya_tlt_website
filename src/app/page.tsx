import SectionHomeHero from '@/page/home/SectionHomeHero'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHomeAbout from '@/page/home/SectionHomeAbout'
import SectionHomeWhyBookUs from '@/page/home/SectionHomeWhyBookUs'
import SectionHomeDedication from '@/page/home/SectionHomeDedication'
import SectionHomeExclusiveStay from '@/page/home/SectionHomeExclusiveStay'
import SectionHomeKeepWithUs from '@/page/home/SectionHomeKeepWithUs'
import SectionHomeLocation from '@/page/home/SectionHomeLocation'
import SectionHomeFAQ from '@/page/home/SectionHomeFAQ'
import FooterLayout from '@/component/layout/Footer.layout'
import FooterNewsLetterLayout from '@/component/layout/FooterNewsLetter.layout'
import SectionHomeBook from '@/page/home/SectionHomeBook'
import { getContentHomePage } from '@/service/api/contentPage.api'

const Home = async () => {
    const content = await getContentHomePage({ locale: 'en' }).then(
        (res) => res?.result || {},
    )

    const value = content?.value || {}

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHomeHero content={value?.SECTION1 || {}} />
            <SectionHomeAbout content={value?.SECTION2 || {}} />
            <SectionHomeBook />
            <SectionHomeExclusiveStay />
            <SectionHomeWhyBookUs />
            <SectionHomeDedication />
            <SectionHomeKeepWithUs />
            <SectionHomeLocation />
            <SectionHomeFAQ />
            <FooterNewsLetterLayout />
            <FooterLayout />
        </>
    )
}

export default Home
