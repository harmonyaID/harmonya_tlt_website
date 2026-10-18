import usePropertyFormInquiryHook from '@/page/property/hook/usePropertyFormInquiry.hook'
import { WrapFormContext } from '@/context/Form.Context'
import FormInput from '@/component/form/FormInput'
import FormTextArea from '@/component/form/FormTextarea'
import { BtnPrimary } from '@/component/general/Button'
import FormWrap from '@/component/wrapping/Form.wrap'

const PropertyFormInquiry = () => {
    const { formRequest, isLoading, _handleChange, _handleSubmit } =
        usePropertyFormInquiryHook()

    return (
        <section className="section-space-small bg-neutral-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-9">
                        <p className="fs-48 text-grey-200 text-uppercase text-center font-tt-drugs">
                            INQUIRY
                        </p>
                        <p className="fs-20 text-center text-grey-400 fw-300">
                            Have a question about this property? Submit your
                            inquiry and our team will get back to you shortly.
                        </p>

                        <div className="pt-5">
                            <FormWrap
                                actions={{
                                    handleSubmit: _handleSubmit,
                                }}>
                                <WrapFormContext
                                    formRequest={formRequest}
                                    actions={{
                                        change: _handleChange,
                                    }}>
                                    <div className="vstack gap-3">
                                        <div className="hstack gap-3 flex-wrap">
                                            <div className="flex-fill">
                                                <FormInput
                                                    label="Name"
                                                    placeholder="e.g Jhon Doe"
                                                    name="name"
                                                    required
                                                />
                                            </div>
                                            <div className="flex-fill">
                                                <FormInput
                                                    label="Email"
                                                    placeholder="e.g jhondoe@gmail.com"
                                                    name="email"
                                                    type="email"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <FormInput
                                            label="Subject"
                                            placeholder="e.g Price"
                                            name="subject"
                                            required
                                        />

                                        <FormTextArea
                                            label="Message"
                                            placeholder="e.g Send"
                                            name="comments"
                                            required
                                        />

                                        <div className="text-end pt-4">
                                            <BtnPrimary
                                                type="submit"
                                                isDisabled={isLoading}
                                                isLoading={isLoading}
                                                className="rounded-pill px-5 text-uppercase font-tt-drugs">
                                                Submit
                                            </BtnPrimary>
                                        </div>
                                    </div>
                                </WrapFormContext>
                            </FormWrap>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PropertyFormInquiry
