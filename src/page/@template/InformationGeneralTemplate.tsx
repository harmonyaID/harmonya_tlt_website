import { PropsSectionContent } from '@/type/sectionContent.type'
import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import RenderHtml from '@/component/general/RenderHtml'
import SectionContent from '@/component/general/SectionContent'

const InformationGeneralTemplate = async ({ content }: PropsSectionContent) => {
    const { SECTION1 = {}, SECTION2 = {} } = content?.content || {}

    return (
        <TemplatePageBaseLayout
            title={SECTION1?.title || ''}
            backgroundImage={SECTION1.backgroundImage}>
            <section className="section-space-small-top">
                <div className="container wp-content-blog">
                    {SECTION2 && SECTION2?.content ? (
                        <SectionContent isBorderBottom={false}>
                            <RenderHtml
                                className="render-content"
                                html={SECTION2.content || ''}
                            />
                        </SectionContent>
                    ) : null}
                </div>
            </section>
        </TemplatePageBaseLayout>
    )
}

export default InformationGeneralTemplate
