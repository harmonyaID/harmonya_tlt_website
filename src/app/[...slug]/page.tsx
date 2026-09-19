import {
    getContentHomePage,
    getPageDetail,
} from '@/service/api/contentPage.api'
import {
    TEMPLATE_BLOG,
    TEMPLATE_EXPERIENCE,
    TEMPLATE_FAQ,
    TEMPLATE_OFFER,
    TEMPLATE_PROPERTY,
} from '@/config/pageTemplate.config'
import BlogTemplate from '@/page/@template/BlogTemplate'
import FAQTemplate from '@/page/@template/FAQTemplate'
import NotFoundTemplate from '@/page/@template/NotFoundTemplate'
import PropertyTemplate from '@/page/@template/PropertyTemplate'
import OfferTemplate from '@/page/@template/OfferTemplate'
import ExperienceTemplate from '@/page/@template/ExperienceTemplate'
import BlogDetailTemplate from '@/page/@template/BlogDetailTemplate'

type PropsData = {
    params: Promise<{ slug: string }>
    [key: string]: any
}

const isSlugLevel4 = (passTemplate = '') => {
    const listTemplate: string[] = [TEMPLATE_EXPERIENCE]
    return listTemplate.includes(passTemplate)
}

const isSlugLevel3 = (passTemplate = '') => {
    const listTemplate = [TEMPLATE_EXPERIENCE]
    return listTemplate.includes(passTemplate)
}

const isSlugLevel2 = (passTemplate = '') => {
    const listTemplate = [TEMPLATE_BLOG, TEMPLATE_EXPERIENCE]
    return listTemplate.includes(passTemplate)
}

const page = async ({ params }: PropsData) => {
    const { slug } = await params

    console.log('slug: ', slug)

    const contentPage = await getPageDetail(slug[0])
        .then((res) => res?.result || {})
        .catch((err) => {
            return {}
        })

    const { template } = contentPage

    if (template) {
        console.log('template: ', template)

        // Slug Level 2
        if (slug[1]) {
            const renderPageTemplateLevel2 = {
                [TEMPLATE_BLOG]: <BlogDetailTemplate slug={slug[1]} />,
            }

            if (renderPageTemplateLevel2[template]) {
                return <>{renderPageTemplateLevel2[template]}</>
            }
        }

        // Slug Level 1
        const renderPageTemplate = {
            [TEMPLATE_BLOG]: <BlogTemplate content={contentPage} />,
            [TEMPLATE_FAQ]: <FAQTemplate content={contentPage} />,
            [TEMPLATE_PROPERTY]: <PropertyTemplate content={contentPage} />,
            [TEMPLATE_OFFER]: <OfferTemplate content={contentPage} />,
            [TEMPLATE_EXPERIENCE]: <ExperienceTemplate content={contentPage} />,
        }

        if (renderPageTemplate[template]) {
            return <>{renderPageTemplate[template]}</>
        }
    }

    return <NotFoundTemplate />
}

export default page
