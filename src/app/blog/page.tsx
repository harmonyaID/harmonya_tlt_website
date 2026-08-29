import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import { getContentHomePage } from '@/service/api/contentPage.api'
import { getBlogList } from '@/service/api/blog.api'
import SectionBlogList from '@/page/blog/SectionBlogList'
import SectionBlogHero from '@/page/blog/SectionBlogHero'
import Breadcrumb from '@/component/general/Breadcrumb'
import { isSuccess } from '@/helper/base/condition.helper'

export const dynamic = 'force-dynamic'

const Blog = async () => {
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

    return (
        <>
            <NavbarLayout isBgTransparent />
            <SectionBlogHero blog={blogs && blogs[0] ? blogs[0] : {}} />

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

export default Blog
