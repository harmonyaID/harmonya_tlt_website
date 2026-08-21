// import NavbarLayout from '@/component/layout/Navbar.layout'
// import FooterLayout from '@/component/layout/Footer.layout'
// import SectionBlogDetail from '@/page/blog/SectionBlogDetail'
// import { getBlogDetail } from '@/service/api/blog.api'
//
// type PropsData = {
//     params: Promise<{ slug: string }>
// }
//
// export const generateMetadata = async ({ params }: PropsData) => {
//     const { slug } = await params
//
//     const dataBlog = await getBlogDetail(slug)
//
//     const dataSEO = {
//         og_url: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`,
//         ...(dataBlog?.seo ?? {}),
//     }
//
//     return {
//         // ...metadata,
//         title: dataSEO?.title || dataBlog?.title || '',
//         alternates: {
//             canonical: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`,
//         },
//     }
// }
//
// const BlogDetail = async ({ params }) => {
//     const { slug } = await params
//
//     const dataBlog = await getBlogDetail(slug, 'tcGetBlogDetail').then(
//         (res) => res?.result || {},
//     )
//
//     return (
//         <>
//             <NavbarLayout isStartFix={false} />
//             <SectionBlogDetail detail={dataBlog} />
//             <FooterLayout />
//         </>
//     )
// }
//
// export default BlogDetail

import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import SectionBlogDetail from '@/page/blog/SectionBlogDetail'
import { getBlogDetail } from '@/service/api/blog.api'

type PropsData = {
    params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: PropsData) => {
    const { slug } = await params
    const dataBlog = await getBlogDetail(slug)

    const dataSEO = {
        og_url: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`,
        ...(dataBlog?.seo ?? {}),
    }

    return {
        title: dataSEO?.title || dataBlog?.title || '',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`,
        },
    }
}

const BlogDetail = async ({ params }: PropsData) => {
    const { slug } = await params

    const dataBlog = await getBlogDetail(slug, 'tcGetBlogDetail').then(
        (res) => res?.result || {},
    )

    return (
        <>
            <NavbarLayout isStartFix={false} />
            <SectionBlogDetail detail={dataBlog} />
            <FooterLayout />
        </>
    )
}

export default BlogDetail
