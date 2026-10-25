'use client'

import useContactFormHook from '@/page/contact/hook/useContactForm.hook'
import { WrapFormContext } from '@/context/Form.Context'
import FormWrap from '@/component/wrapping/Form.wrap'
import FormInput from '@/component/form/FormInput'
import FormTextArea from '@/component/form/FormTextarea'
import { BtnPrimary } from '@/component/general/Button'
import useContactType from '@/page/contact/hook/useContactType'
import FormSelectOption from '@/component/form/FormSelectOption'

const ContactForm = () => {
    const { formRequest, isLoading, _handleChange, _handleSubmit } =
        useContactFormHook()

    const { listType } = useContactType()

    return (
        <>
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
                        <FormInput
                            label="Name"
                            placeholder="e.g Jhon Doe"
                            name="name"
                            required
                        />
                        <div className="hstack gap-3 flex-wrap">
                            <div className="flex-fill">
                                <FormInput
                                    label="Phone Number"
                                    placeholder="e.g 6287xxxxx"
                                    name="phoneNumber"
                                    type="number"
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

                        <FormSelectOption
                            label="Type of Inquiry"
                            required
                            name="formTypeId">
                            <option value="">- Select Type -</option>
                            {listType?.map((vm: any, index) => (
                                <option value={vm.id} key={index}>
                                    {vm.name}
                                </option>
                            ))}
                        </FormSelectOption>

                        <FormInput
                            label="Subject"
                            placeholder="e.g Price"
                            name="subject"
                            required
                        />

                        <FormTextArea
                            label="Message"
                            placeholder="e.g Send"
                            name="message"
                            required
                        />

                        <div className="text-end pt-4">
                            <BtnPrimary
                                type="submit"
                                isLoading={isLoading}
                                className="rounded-pill px-5 text-uppercase font-tt-drugs">
                                Submit
                            </BtnPrimary>
                        </div>
                    </div>
                </WrapFormContext>
            </FormWrap>
        </>
    )
}

export default ContactForm
