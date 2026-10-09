import { PropsSectionContent } from '@/type/sectionContent.type'
import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import SectionContactForm from '@/page/contact/SectionContactForm'
import SectionContactAddress from '@/page/contact/SectionContactAddress'

const ContactTemplate = async ({ content }: PropsSectionContent) => {
    const { SECTION1 = {}, SECTION2 = {}, SECTION3 } = content?.content || {}

    console.log('SECTION1: ', SECTION1)
    console.log('SECTION3: ', SECTION3)

    return (
        <TemplatePageBaseLayout
            title={SECTION1?.title || ''}
            backgroundImage={SECTION1.backgroundImage}>
            <SectionContactForm content={SECTION2} />
            <SectionContactAddress content={SECTION3} />
        </TemplatePageBaseLayout>
    )
}

export default ContactTemplate
