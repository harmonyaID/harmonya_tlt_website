import { getDetailExperience } from '@/service/api/experience.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroSecondInfo from '@/component/general/SectionHeroSecondInfo'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import SectionExpDetailInfo from '@/page/experience/SectionExpDetailInfo'

const ExperienceDetailLevel3Template = async ({ slug }: { slug: string }) => {
    const experienceDetail = await getDetailExperience(slug).then(
        (res) => res?.result || {},
    )

    console.log('experienceDetail: ', experienceDetail)

    const { name, thumbnail } = experienceDetail || {}

    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecondInfo
                content={{
                    title: name,
                    image: thumbnail,
                }}
            />
            <div className="container">
                <div className="pt-4">
                    <Breadcrumb />
                </div>
            </div>
            <SectionExpDetailInfo content={experienceDetail} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceDetailLevel3Template
