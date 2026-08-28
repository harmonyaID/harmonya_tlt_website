// ============================================
// Contoh 1: app/about/page.tsx
// URL: /about  ->  Home / About  (otomatis, tanpa props)
// ============================================
import Breadcrumb from '@/component/general/Breadcrumb'

export const AboutPage = () => {
    return (
        <div>
            <Breadcrumb />
            {/* ...konten halaman... */}
        </div>
    )
}

// ============================================
// Contoh 2: app/blog/page.tsx
// URL: /blog  ->  Home / Blog  (otomatis, tanpa props)
// ============================================
export const BlogListPage = () => {
    return (
        <div>
            <Breadcrumb />
            {/* ...daftar artikel... */}
        </div>
    )
}

// ============================================
// Contoh 3: app/blog/[slug]/page.tsx
// URL: /blog/mindful-travel-tips-to-nusa-lembongan
// Tanpa title  ->  Home / Blog / Mindful Travel Tips To Nusa Lembongan
//                  (auto-format dari slug URL)
// Dengan title ->  pakai judul asli dari database/CMS
// ============================================
async function getPost(slug: string) {
    // fetch dari CMS/database kamu
    return { slug, title: 'Mindful Travel Tips To Nusa Lembongan' }
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string }
}) {
    const post = await getPost(params.slug)

    return (
        <div>
            {/* Cukup kirim judul aslinya, sisanya (Home / Blog) tetap otomatis */}
            <Breadcrumb title={post.title} />
            {/* ...konten artikel... */}
        </div>
    )
}
