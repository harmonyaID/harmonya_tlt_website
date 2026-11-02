import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionHeroHalfScreen from '@/component/general/SectionHeroHalfScreen'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import SearchMainList from '@/page/search/SearchMainList'
import { unslugify } from '@/helper/slugify.helper'

const SearchTemplate = async ({
    slug,
    content,
}: {
    slug: string
    content: any
}) => {
    const { SECTION1 } = content?.content || {}

    return (
        <>
            <SectionHeroHalfScreen
                content={{
                    title: SECTION1.title,
                    image: SECTION1.backgroundImage,
                }}
            />
            <NavbarLayout isBgTransparent />
            <SearchMainList search={unslugify(slug)} />
            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default SearchTemplate
