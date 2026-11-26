import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import FormRangeDatepicker from '@/component/form/FormRangeDatepicker'
import { BtnBasic, BtnPrimary } from '@/component/general/Button'
import { ReactNode } from 'react'
import FormInput from '@/component/form/FormInput'
import FormCheckbox from '@/component/form/FormCheckBox'
import {
    IconCalendar,
    IconGuest,
    IconMail,
    IconShare,
} from '@/page/propertyVariant/component/PropertyVariantIcons'
import usePropertyVariantBookingBookeasy from '@/page/propertyVariant/hook/usePropertyVariantBookingBookeasy.hook'

const LabelForm = ({ children }: { children?: ReactNode }) => (
    <p className="fs-14 text-neutral-500 mb-2 font-tt-drugs text-uppercase fw-500">
        {children}
    </p>
)

const PropertyVariantBookingBookeasy = ({
    propertyVariant = {},
}: {
    propertyVariant?: any
}) => {
    const { formRequest, isLoading, _handleChange, _handleSubmit } =
        usePropertyVariantBookingBookeasy(propertyVariant)

    return (
        <>
            <div className="p-4 border border-neutral-200 rounded-4">
                {propertyVariant?.nickname ? (
                    <p className="fs-18 font-tt-drugs fw-600 text-grey-200 pt-2">
                        {propertyVariant.nickname}
                    </p>
                ) : null}

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
                                        // tanggal yang sudah lewat tidak bisa dipilih
                                        minDate: new Date(
                                            new Date().setHours(0, 0, 0, 0),
                                        ),
                                    }}
                                    startName="checkInDate"
                                    endName="checkOutDate"
                                    isIconArrow
                                    placeholderFrom="Check-In"
                                    placeholderTo="Check-Out"
                                    icon={<IconCalendar />}
                                    classNameIcon="position-absolute top-0 end-0"
                                />
                            </div>
                            <div className="border-bottomP pb-0">
                                <LabelForm>Guest</LabelForm>
                                <FormInput
                                    name="adultCount"
                                    placeholder="Number of guests"
                                    className="form-property"
                                    // type="number"
                                    isNumberOnly
                                    icon={<IconGuest />}
                                    classNameIcon="position-absolute top-0 end-0"
                                    value={formRequest.adultCount}
                                />
                            </div>
                            <div className="border-bottomP pb-0">
                                <LabelForm>Full Name</LabelForm>
                                <FormInput
                                    name="name"
                                    placeholder="John Doe"
                                    className="form-property"
                                    // type="number"
                                    value={formRequest.name}
                                />
                            </div>
                            <div className="border-bottomP pb-0">
                                <LabelForm>Phone Number</LabelForm>
                                <FormInput
                                    name="mobileNumber"
                                    placeholder="628123456789"
                                    className="form-property"
                                    // type="number"
                                    value={formRequest.mobileNumber}
                                />
                            </div>
                            <div className="border-bottomP pb-0">
                                <LabelForm>Email</LabelForm>
                                <FormInput
                                    name="email"
                                    placeholder="johndoe01@gmail.com"
                                    className="form-property"
                                    // type="number"
                                    type="email"
                                    value={formRequest.email}
                                />
                            </div>

                            <div className="">
                                <div className="pb-3">
                                    <FormCheckbox
                                        label="I Have A Coupon"
                                        name="isUseCoupon"
                                        value={formRequest.isUseCoupon}
                                        change={(e) =>
                                            _handleChange(
                                                'isUseCoupon',
                                                e.target.checked ? 1 : 0,
                                            )
                                        }
                                    />

                                    {formRequest.isUseCoupon ? (
                                        <FormInput
                                            name="couponCode"
                                            placeholder="COUPON CODE 123"
                                            className="form-property mt-2"
                                            // type="number"
                                            value={formRequest.couponCode}
                                        />
                                    ) : (
                                        <hr />
                                    )}
                                </div>
                            </div>
                        </div>
                    </WrapFormContext>

                    <BtnPrimary
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        className="rounded-pillP w-100 text-uppercase fs-24">
                        Book Now
                    </BtnPrimary>
                </FormWrap>

                <hr />

                <div className="row g-2">
                    <div className="col-lg-6 col-md-12">
                        <BtnPrimary
                            type="button"
                            className="rounded-pill w-100">
                            <div className="hstack gap-2 align-items-center justify-content-center">
                                <span> SHARE</span>
                                <IconShare />
                            </div>
                        </BtnPrimary>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <BtnPrimary
                            type="button"
                            className="rounded-pill w-100"
                            isOutline>
                            <div className="hstack gap-2 align-items-center justify-content-center">
                                <IconMail />
                                <span>ASK QUESTION</span>
                            </div>
                        </BtnPrimary>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyVariantBookingBookeasy
