import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import BGHero from '@/asset/image/dummy/default-bg-faq.jpg'

const ContactUsPage = () => {
    return (
        <TemplatePageBaseLayout title="FAQ" backgroundImage={BGHero}>
            <section className="section-space">
                <div className="container">
                    <h4 className="">Hello</h4>
                </div>
            </section>
        </TemplatePageBaseLayout>
    )
}

export default ContactUsPage
