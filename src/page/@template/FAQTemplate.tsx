import { PropsSectionContent } from '@/type/sectionContent.type'
import BGHero from '@/asset/image/dummy/default-bg-faq.jpg'
import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'

const FAQTemplate = async ({ content }: PropsSectionContent) => {
    console.log('content: ', content)
    const { SECTION1 = {}, SECTION2 = {} } = content?.content || {}

    return (
        <TemplatePageBaseLayout
            title={SECTION1?.title || ''}
            backgroundImage={SECTION1.backgroundImage}>
            <section className="section-space">
                <div className="container">
                    <h4 className="">Hello</h4>
                </div>
            </section>
        </TemplatePageBaseLayout>
    )
}

export default FAQTemplate
