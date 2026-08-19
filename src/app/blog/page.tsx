import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import { getContentHomePage } from '@/service/api/contentPage.api'
import { getBlogList } from '@/service/api/blog.api'
import SectionBlogList from '@/page/blog/SectionBlogList'

const Blog = async () => {
    const page = 1
    const blogs = await getBlogList({ page }).then((res) => res?.result || {})

    return (
        <>
            <NavbarLayout isStartFix={false} />
            <SectionBlogList passBlogs={blogs} passPage={page} />
            <FooterLayout />
        </>
    )
}

export default Blog
