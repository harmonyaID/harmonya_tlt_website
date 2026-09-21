import { getDetailExperience } from '@/service/api/experience.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionHeroSecondSmall from '@/component/general/SectionHeroSecondSmall'
import SectionHeroSecond from '@/component/general/SectionHeroSecond'

const ExperienceDetailLevel3Template = async ({ slug }: { slug?: string }) => {
    const experienceDetail = await getDetailExperience('1').then(
        (res) => res?.result || {},
    )

    const { name, banner, featuredImage } = experienceDetail || {}

    return (
        <>
            <NavbarLayout isBgTransparent={false} isStartFix={false} />
            <SectionHeroSecond
                content={{
                    title: name,
                    image: featuredImage,
                }}
            />
        </>
    )
}

export default ExperienceDetailLevel3Template
