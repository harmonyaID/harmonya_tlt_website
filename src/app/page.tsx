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

export default function Home() {
    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionHomeHero />
            <SectionHomeAbout />
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
