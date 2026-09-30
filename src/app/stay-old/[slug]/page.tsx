import { getBlogDetail } from '@/service/api/blog.api'
import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterNewsLatterStaticLayout from '@/component/layout/FooterNewsLatterStatic.layout'
import FooterLayout from '@/component/layout/Footer.layout'

// export const dynamic = 'force-dynamic'
//
// type PropsData = {
//     params: Promise<{ slug: string }>
//     [key: string]: any
// }
//
// export const generateMetadata = async ({ params }: PropsData) => {
//     const { slug } = await params
//     const dataBlog = await getBlogDetail(slug, 'tcGetSlugData').then(
//         (res) => res?.result || {},
//     )
//
//     const dataSEO = {
//         og_url: `${process.env.NEXT_PUBLIC_BASE_URL}stay/${slug}`,
//         ...(dataBlog?.seo ?? {}),
//     }
//
//     return {
//         title: dataSEO?.title || dataBlog?.seo?.title || 'Detail Blog',
//         alternates: {
//             canonical: `${process.env.NEXT_PUBLIC_BASE_URL}stay/${slug}`,
//         },
//     }
// }

const StayDetailPage = () => {
    return (
        <>
            <NavbarLayout isStartFix={false} />

            <FooterNewsLatterStaticLayout />
            <FooterLayout />
        </>
    )
}

export default StayDetailPage
