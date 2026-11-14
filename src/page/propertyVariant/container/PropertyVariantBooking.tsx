import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import FormRangeDatepicker from '@/component/form/FormRangeDatepicker'
import { BtnPrimary } from '@/component/general/Button'
import { ReactNode } from 'react'
import FormInput from '@/component/form/FormInput'
import usePropertyVariantBooking from '@/page/propertyVariant/hook/usePropertyVariantBooking.hook'

const LabelForm = ({ children }: { children?: ReactNode }) => (
    <p className="fs-14 text-neutral-500 mb-2 font-tt-drugs text-uppercase fw-500">
        {children}
    </p>
)

const PropertyVariantBooking = ({
    propertyVariant = {},
}: {
    propertyVariant?: any
}) => {
    const { formRequest, _handleChange, _handleSubmit } =
        usePropertyVariantBooking(propertyVariant?.guestyId || '')

    return (
        <>
            <div className="p-4 border border-neutral-200 rounded-4">
                <p className="fs-18 font-tt-drugs fw-600 text-grey-200 pt-2">
                    {propertyVariant?.nickname || 'Villa tanjung - 4 bedrooms'}
                </p>

                <FormWrap actions={{ handleSubmit: () => _handleSubmit() }}>
                    <WrapFormContext
                        formRequest={{ formRequest }}
                        actions={{
                            change: _handleChange,
                        }}>
                        <div className="vstack gap-3 mb-4">
                            <div className="border-bottomP pb-0">
                                <LabelForm>check-in & Check-out</LabelForm>
                                <FormRangeDatepicker
                                    className="form-property"
                                    config={{
                                        format: 'dd M yyyy',
                                    }}
                                    isIconArrow
                                    placeholderFrom="Check-In"
                                    placeholderTo="Check-Out"
                                />
                            </div>
                            <div className="border-bottomP pb-0">
                                <LabelForm>Guest</LabelForm>
                                <FormInput
                                    name="guest"
                                    placeholder="e.g 8"
                                    className="form-property"
                                    // type="number"
                                    isNumberOnly
                                    value={formRequest.guest}
                                />
                            </div>
                        </div>
                    </WrapFormContext>

                    <BtnPrimary
                        type="submit"
                        className="rounded-pillP w-100 text-uppercase">
                        Search
                    </BtnPrimary>
                </FormWrap>

                {/*<BtnPrimary*/}
                {/*    type="button"*/}
                {/*    className="rounded-pillP w-100 text-uppercase">*/}
                {/*    Book Now*/}
                {/*</BtnPrimary>*/}

                <hr />

                <div className="row g-2">
                    <div className="col-lg-6 col-md-12">
                        <BtnPrimary
                            type="button"
                            className="rounded-pill w-100">
                            SHARE
                        </BtnPrimary>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <BtnPrimary
                            type="button"
                            className="rounded-pill w-100"
                            isOutline>
                            ASK QUESTION
                        </BtnPrimary>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyVariantBooking
