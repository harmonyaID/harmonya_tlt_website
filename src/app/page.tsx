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
import SectionHomeLiveTheIslandLife from '@/page/home/SectionHomeLiveTheIslandLife'
import SectionHomeNeighbourhoods from '@/page/home/SectionHomeNeighbourhoods'

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
            <SectionHomeLiveTheIslandLife content={value?.SECTION3 || {}} />
            <SectionHomeNeighbourhoods content={value?.SECTION4 || {}} />
            <SectionHomeBook items={value?.SECTION5 || []} />
            <SectionHomeExclusiveStay />
            <SectionHomeWhyBookUs content={value?.SECTION7 || {}} />
            <SectionHomeDedication content={value?.SECTION9 || {}} />
            <SectionHomeKeepWithUs />
            <SectionHomeLocation />
            <SectionHomeFAQ />
            <FooterNewsLetterLayout content={value?.SECTION13 || {}} />
            <FooterLayout />
        </>
    )
}

export default Home
