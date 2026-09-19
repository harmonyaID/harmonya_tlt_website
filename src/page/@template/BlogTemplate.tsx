import { PropsSectionContent } from '@/type/sectionContent.type'
import { getBlogList } from '@/service/api/blog.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import SectionBlogHero from '@/page/blog/SectionBlogHero'
import Breadcrumb from '@/component/general/Breadcrumb'
import SectionBlogList from '@/page/blog/SectionBlogList'
import FooterLayout from '@/component/layout/Footer.layout'

const BlogTemplate = async ({ content }: PropsSectionContent) => {
    const page = 1
    const { blogs = [], pagination = {} } = await getBlogList({
        page,
        limit: 12,
    }).then((res) => {
        return {
            blogs: res?.result || [],
            pagination: res?.pagination || {},
        }
    })

    const { SECTION1 } = content?.content || {}

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionBlogHero
                content={SECTION1 || {}}
                blog={blogs && blogs[0] ? blogs[0] : {}}
            />

            <section className="container py-4">
                <Breadcrumb />
            </section>
            <SectionBlogList
                passBlogs={blogs}
                passPage={page}
                passPagination={pagination}
            />
            <FooterLayout />
        </>
    )
}

export default BlogTemplate
