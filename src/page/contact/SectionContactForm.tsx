import ContactForm from '@/page/contact/container/ContactForm'

const SectionContactForm = ({ content = {} }: { content?: any }) => {
    return (
        <section className="section-space-small-top pb-5">
            <div className="container">
                <div className="row justify-content-center pb-5">
                    <div className="col-md-10">
                        <div className="row gy-4 justify-content-between">
                            <div className="col-md-4">
                                <p className="fs-48 font-tt-drugs text-grey-200">
                                    {content.title}
                                </p>
                                <p className="fs-16 text-grey-400">
                                    {content?.description || ''}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionContactForm
