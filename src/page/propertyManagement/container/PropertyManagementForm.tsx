'use client'
import usePropertyManagementFormHook from '@/page/propertyManagement/hook/usePropertyManagementForm.hook'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import FormInput from '@/component/form/FormInput'
import FormSelectOption from '@/component/form/FormSelectOption'
import FormTextArea from '@/component/form/FormTextarea'
import { BtnPrimary } from '@/component/general/Button'

const PropertyManagementForm = ({ content = {} }: { content?: any }) => {
    const { formRequest, isLoading, _handleChange, _handleSubmit } =
        usePropertyManagementFormHook()

    return (
        <section className="section-space-small bg-neutral-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-8">
                        <p className="fs-48 text-grey-200 text-uppercase text-center font-tt-drugs">
                            {content?.title}
                        </p>

                        <p className="fs-20 text-center text-grey-400 fw-300">
                            {content?.description}
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center pt-4">
                    <div className="col-md-6">
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

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Phone Number"
                                                placeholder="e.g 6287xxxxx"
                                                name="phoneNumber"
                                                type="number"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Email"
                                                placeholder="e.g jhondoe@gmail.com"
                                                name="email"
                                                type="email"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Property Name"
                                                placeholder="e.g Villa"
                                                name="propertyName"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormSelectOption
                                                label="Property Type"
                                                required
                                                name="propertyTypeId">
                                                <option value="">
                                                    - Select Type -
                                                </option>
                                            </FormSelectOption>
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Number of Rooms"
                                                placeholder="e.g 102"
                                                name="propertyNumberOfRooms"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Property Location"
                                                placeholder="e.g Lembongan"
                                                name="propertyName"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <FormSelectOption
                                        label=" Service of Interest"
                                        required
                                        name="serviceOfInterestId">
                                        <option value="">
                                            - Select Type -
                                        </option>
                                    </FormSelectOption>

                                    <FormTextArea
                                        label="Short Message"
                                        name="description"
                                        rows={4}
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PropertyManagementForm
