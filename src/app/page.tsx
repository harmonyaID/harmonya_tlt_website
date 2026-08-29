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
import {
    getContentHomePage,
    getFAQHomePage,
    getMediaPartner,
} from '@/service/api/contentPage.api'
import SectionHomeLiveTheIslandLife from '@/page/home/SectionHomeLiveTheIslandLife'
import SectionHomeNeighbourhoods from '@/page/home/SectionHomeNeighbourhoods'
import SectionHomePartner from '@/page/home/SectionHomePartner'
import dataMenuNavbarServerside from '@/hook/dataMenuNavbarServerside.hook'
import FooterNewsLatterStatic from '@/component/layout/FooterNewsLatterStatic.layout'

export const dynamic = 'force-dynamic'

const Home = async () => {
    const content = await getContentHomePage({ locale: 'en' }).then(
        (res) => res?.result || {},
    )

    const value = content?.value || {}

    const dataFAQs = await getFAQHomePage({ locale: 'en' }).then(
        (res) => res?.result || {},
    )

    const partners = await getMediaPartner({ locale: 'en' }).then(
        (res) => res?.result || {},
    )

    const { menus } = await dataMenuNavbarServerside()

    return (
        <>
            <NavbarLayout menus={menus} isBgTransparent />
            <SectionHomeHero content={value?.SECTION1 || {}} />
            <SectionHomeAbout content={value?.SECTION2 || {}} />
            <SectionHomeLiveTheIslandLife content={value?.SECTION3 || {}} />
            <SectionHomeNeighbourhoods content={value?.SECTION4 || {}} />
            <SectionHomeBook items={value?.SECTION5 || []} />
            <SectionHomeExclusiveStay content={value.SECTION6 || {}} />
            <SectionHomeWhyBookUs content={value?.SECTION7 || {}} />
            <SectionHomePartner
                content={value?.SECTION8 || {}}
                partners={partners || []}
            />
            <SectionHomeDedication content={value?.SECTION9 || {}} />
            <SectionHomeKeepWithUs content={value?.SECTION10 || {}} />
            <SectionHomeLocation content={value?.SECTION11 || {}} />
            <SectionHomeFAQ content={value?.SECTION12 || {}} list={dataFAQs} />
            <FooterNewsLetterLayout content={value?.SECTION13 || {}} />
            <FooterLayout />
        </>
    )
}

export default Home
