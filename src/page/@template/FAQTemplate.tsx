import { PropsSectionContent } from '@/type/sectionContent.type'
import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import { getBlogDetail } from '@/service/api/blog.api'
import { getFAQList } from '@/service/api/contentPage.api'
import FAQList from '@/page/faq/component/FAQList'

const FAQTemplate = async ({ content }: PropsSectionContent) => {
    const { SECTION1 = {}, SECTION2 = {} } = content?.content || {}

    const faqsList = await getFAQList(
        {
            typeId: SECTION2.typeId ? Number(SECTION2.typeId) : '',
            page: 0,
        },
        'tcGetFAQsList',
    ).then((res) => res?.result || {})

    return (
        <TemplatePageBaseLayout
            title={SECTION1?.title || ''}
            backgroundImage={SECTION1.backgroundImage}>
            <section className="section-space-small">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h4 className="text-center text-grey-400 font-tt-drugs">
                                {SECTION2?.title || ''}
                            </h4>

                            <div className="py-4">
                                <FAQList
                                    list={faqsList}
                                    idAccordion="accordionFlushGeneralPage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </TemplatePageBaseLayout>
    )
}

export default FAQTemplate
