import RenderHtml from '@/component/general/RenderHtml'

const SectionExpDataInfo = ({ content = {} }: { content?: any }) => {
    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="row gx-8 gy-5">
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs fs-48 text-grey-200"
                                html={content?.title || ''}
                            />
                        </div>
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs text-grey-400"
                                html={content?.description || ''}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionExpDataInfo
