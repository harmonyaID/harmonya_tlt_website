import RenderHtml from '@/component/general/RenderHtml'

const SectionHorizontalTitleAndDesc = ({
    title,
    description,
}: {
    content?: any
    title?: string
    description?: string
}) => {
    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <div className="row gx-8 gy-5">
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs fs-48 text-grey-200"
                                html={title || ''}
                            />
                        </div>
                        <div className="col-md-6">
                            <RenderHtml
                                className="wp-font-tt-drugs text-grey-400"
                                html={description || ''}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionHorizontalTitleAndDesc
