import { getDetailExperience } from '@/service/api/experience.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroSecondInfo from '@/component/general/SectionHeroSecondInfo'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import SectionExpDetailInfo from '@/page/experience/SectionExpDetailInfo'
import ExpOtherList from '@/page/experience/container/ExpOtherList'

const ExperienceDetailLevel3Template = async ({
    slug,
    allSlug = [],
}: {
    slug: string
    allSlug?: any
}) => {
    const experienceDetail = await getDetailExperience(slug).then(
        (res) => res?.result || {},
    )

    console.log('experienceDetail: ', experienceDetail)

    const { name, thumbnail, area = {}, type = {} } = experienceDetail || {}

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
            <section className="section-space-small-top bg-neutral-100">
                <ExpOtherList
                    title="Other Restaurant"
                    configSearch={{
                        limit: 3,
                        areaId: area?.id || '',
                        typeId: type?.id || '',
                    }}
                    basePath={
                        '/' + allSlug[0] + '/' + allSlug[1] + '/' + allSlug[2]
                    }
                />
            </section>
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default ExperienceDetailLevel3Template
