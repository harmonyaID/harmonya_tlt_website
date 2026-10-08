import RenderHtml from '@/component/general/RenderHtml'

const SectionContactAddress = ({
    SECTION2 = {},
    SECTION3 = {},
}: {
    SECTION2?: any
    SECTION3?: any
}) => {
    return (
        <section>
            <div className="container">
                <hr />

                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h4 className="font-tt-drugs">
                                    {SECTION3?.title}
                                </h4>
                            </div>

                            <div className="col-md-4">
                                <RenderHtml html={SECTION3?.address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionContactAddress
