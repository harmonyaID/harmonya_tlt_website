// component/seo/Seo.tsx  (JANGAN pakai 'use client')
type SeoData = {
    title?: string
    description?: string
    keywords?: string | string[]
    canonical?: string
    image?: string
    noindex?: boolean
}

const SEOBasicGeneral = ({
    seo = {},
    fallbackTitle,
}: {
    seo?: SeoData
    fallbackTitle?: string
}) => {
    const title = seo.title || fallbackTitle
    const keywords = Array.isArray(seo.keywords)
        ? seo.keywords.join(', ')
        : seo.keywords

    return (
        <>
            {title && <title>{title}</title>}
            {seo.description && (
                <meta name="description" content={seo.description} />
            )}
            {keywords && <meta name="keywords" content={keywords} />}
            {seo.noindex && <meta name="robots" content="noindex,nofollow" />}
            {seo.canonical && <link rel="canonical" href={seo.canonical} />}

            {title && <meta property="og:title" content={title} />}
            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta name="twitter:card" content="summary_large_image" />
            {title && <meta name="twitter:title" content={title} />}
            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
        </>
    )
}

export default SEOBasicGeneral
