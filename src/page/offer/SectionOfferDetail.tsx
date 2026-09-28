import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'
import SectionContent from '@/component/general/SectionContent'

const SectionOfferDetail = ({ detail = {} }: { detail?: any }) => {
    return (
        <>
            <section className="bg-white pt-5">
                <div className="container">
                    <Breadcrumb isLabelHome />
                </div>
            </section>
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 wp-content-blog">
                            {detail?.excerpt ? (
                                <SectionContent>
                                    <RenderHtml
                                        className="render-content"
                                        html={detail.excerpt}
                                    />
                                </SectionContent>
                            ) : null}

                            {detail?.content ? (
                                <SectionContent isBorderBottom={false}>
                                    <RenderHtml
                                        className="render-content"
                                        html={detail?.content || ''}
                                    />
                                </SectionContent>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionOfferDetail
