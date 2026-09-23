import RenderHtml from '@/component/general/RenderHtml'
import joinClassNameHelper from '@/helper/joinClassName.helper'

const ContactInformation = ({
    label,
    value,
    className,
}: {
    label?: string
    value?: string
    className?: string
}) => {
    return (
        <div className={joinClassNameHelper('vstack gap-1', className)}>
            <p className="fs-16 text-grey-400 fw-bold mb-0">{label}</p>
            <p className="fs-16 text-grey-400 fw-normal mb-0">{value}</p>
        </div>
    )
}

const SectionExpDetailInfo = ({ content = {} }: { content?: any }) => {
    const { name, thumbnail, description, whatsapp } = content || {}

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6"></div>
                    </div>

                    {/*SLIDER's*/}

                    {/*DETAIL INFORMATION*/}
                    <div className="row justify-content-between gx-4">
                        <div className="col-md-7">
                            <div className="vstack gap-4">
                                <RenderHtml
                                    className="wp-font-tt-drugs fs-48 text-grey-200"
                                    html={'<h4>INFORMATION</h4>'}
                                />

                                <RenderHtml
                                    className="fs-16 text-grey-400"
                                    html={description || ''}
                                />

                                <hr />

                                <RenderHtml
                                    className="wp-font-tt-drugs fs-48 text-grey-200 pb-3"
                                    html={'<h4>LOCATION</h4>'}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="px-5 py-4 border border-neutral-200 rounded-4">
                                <p className="fs-20 font-tt-drugs fw-semibold text-grey-200 text-center pt-3">
                                    INFO & RESERVATION
                                </p>

                                <ContactInformation
                                    label="Whatsapp"
                                    value={whatsapp}
                                    className="mb-3"
                                />

                                <ContactInformation
                                    label="Email"
                                    value="alponteristorante.lembongan@gmail.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionExpDetailInfo
