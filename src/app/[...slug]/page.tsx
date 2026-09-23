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
import ExperienceDetailLevel1Template from '@/page/@template/ExperienceDetailLevel1Template'
import ExperienceDetailLevel2Template from '@/page/@template/ExperienceDetailLevel2Template'
import ExperienceDetailLevel3Template from '@/page/@template/ExperienceDetailLevel3Template'

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

        if (slug[3] && slug.length === 4) {
            const renderPageTemplateLevel4 = {
                [TEMPLATE_EXPERIENCE]: (
                    <ExperienceDetailLevel3Template slug={slug[3]} />
                ),
            }

            if (renderPageTemplateLevel4[template]) {
                return <>{renderPageTemplateLevel4[template]}</>
            }
        } else if (slug[2] && slug.length === 3) {
            // Slug Level 3
            const renderPageTemplateLevel3 = {
                [TEMPLATE_EXPERIENCE]: (
                    <ExperienceDetailLevel2Template slug={slug[2]} />
                ),
            }

            if (renderPageTemplateLevel3[template]) {
                return <>{renderPageTemplateLevel3[template]}</>
            }
        } else if (slug[1] && slug.length === 2) {
            // Slug Level 2
            const renderPageTemplateLevel2 = {
                [TEMPLATE_BLOG]: <BlogDetailTemplate slug={slug[1]} />,
                [TEMPLATE_EXPERIENCE]: (
                    <ExperienceDetailLevel1Template slug={slug[1]} />
                ),
            }

            if (renderPageTemplateLevel2[template]) {
                return <>{renderPageTemplateLevel2[template]}</>
            }
        } else if (slug[0] && slug.length === 1) {
            // Slug Level 1
            const renderPageTemplate = {
                [TEMPLATE_BLOG]: <BlogTemplate content={contentPage} />,
                [TEMPLATE_FAQ]: <FAQTemplate content={contentPage} />,
                [TEMPLATE_PROPERTY]: <PropertyTemplate content={contentPage} />,
                [TEMPLATE_OFFER]: <OfferTemplate content={contentPage} />,
                [TEMPLATE_EXPERIENCE]: (
                    <ExperienceTemplate content={contentPage} />
                ),
            }

            if (renderPageTemplate[template]) {
                return <>{renderPageTemplate[template]}</>
            }
        }
    }

    return <NotFoundTemplate />
}

export default page
