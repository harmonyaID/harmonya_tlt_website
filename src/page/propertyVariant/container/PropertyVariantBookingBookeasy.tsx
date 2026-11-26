import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import FormRangeDatepicker from '@/component/form/FormRangeDatepicker'
import { BtnBasic, BtnPrimary } from '@/component/general/Button'
import { ReactNode } from 'react'
import FormInput from '@/component/form/FormInput'
import usePropertyVariantBooking from '@/page/propertyVariant/hook/usePropertyVariantBooking.hook'
import { formatMoney } from '@/helper/guestyBooking.helper'
import { formatAUD } from '@/helper/currency.helper'
import FormCheckbox from '@/component/form/FormCheckBox'
import {
    IconCalendar,
    IconGuest,
    IconInfo,
    IconMail,
    IconShare,
} from '@/page/propertyVariant/component/PropertyVariantIcons'
import usePropertyVariantBookingBookeasy from '@/page/propertyVariant/hook/usePropertyVariantBookingBookeasy.hook'
import LoadingSpinner from '@/component/loading/LoadingSpinner'
import FormPhone from '@/component/form/FormPhone'

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
                                        // tanggal yang sudah lewat tidak bisa dipilih
                                        minDate: new Date(),
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
                                    placeholder="e.g 8"
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
                                <FormPhone
                                    name="mobileNumber"
                                    placeholder="628123456789"
                                    variant="underline"
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

                            <div className="border-bottomP pb-0">
                                <div className="border-bottom hstack justify-content-between py-2">
                                    <LabelForm>Price</LabelForm>
                                    <p className="m-0 fs-20 fw-semibold font-tt-drugs color-555">
                                        {formatAUD(formRequest.pricePerNight)}
                                        <span className="fw-light fs-16">
                                            /Night
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/*<div className="">*/}
                            {/*    <div className="hstack justify-content-between py-2">*/}
                            {/*        <LabelForm>Fee</LabelForm>*/}
                            {/*        <p className="m-0 fw-light fs-16 font-tt-drugs color-555">*/}
                            {/*            {formatAUD(185.63)}*/}
                            {/*        </p>*/}
                            {/*    </div>*/}

                            {/*    <div className="hstack gap-2 pb-3">*/}
                            {/*        <div*/}
                            {/*            className=" rounded-3 fs-14"*/}
                            {/*            style={{*/}
                            {/*                padding: '0.1rem .5rem',*/}
                            {/*                border: '1px solid #707070',*/}
                            {/*            }}>*/}
                            {/*            Non-Refundable*/}
                            {/*        </div>*/}
                            {/*        <div*/}
                            {/*            className=" rounded-3 fs-14"*/}
                            {/*            style={{*/}
                            {/*                padding: '0.1rem .5rem',*/}
                            {/*                border: '1px solid #707070',*/}
                            {/*            }}>*/}
                            {/*            Breakfast Included*/}
                            {/*        </div>*/}
                            {/*    </div>*/}

                            {/*    <div className="pb-3">*/}
                            {/*        <FormCheckbox*/}
                            {/*            label="I Have A Coupon"*/}
                            {/*            name="isUseCoupon"*/}
                            {/*            value={formRequest.isUseCoupon}*/}
                            {/*            change={(e) =>*/}
                            {/*                _handleChange(*/}
                            {/*                    'isUseCoupon',*/}
                            {/*                    e.target.checked ? 1 : 0,*/}
                            {/*                )*/}
                            {/*            }*/}
                            {/*        />*/}

                            {/*        {formRequest.isUseCoupon ? (*/}
                            {/*            <FormInput*/}
                            {/*                name="couponCode"*/}
                            {/*                placeholder="COUPON CODE 123"*/}
                            {/*                className="form-property mt-2"*/}
                            {/*                // type="number"*/}
                            {/*                value={formRequest.couponCode}*/}
                            {/*            />*/}
                            {/*        ) : (*/}
                            {/*            <hr />*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="hstack justify-content-between">
                                <LabelForm>Total</LabelForm>
                                <div className="text-end">
                                    <p className="m-0 fs-24 fw-semibold font-tt-drugs color-555">
                                        {formatAUD(formRequest.total)}
                                    </p>
                                    <p
                                        className="m-0 fs-14 fw-light"
                                        style={{
                                            color: '#878787',
                                        }}>
                                        For {formRequest.nights} Nights Stay
                                    </p>
                                </div>
                            </div>

                            {formRequest.total > 0 && (
                                <div
                                    className="hstack gap-2 align-items-start"
                                    style={{
                                        background: 'rgba(0, 167, 156, 0.2)',
                                        borderRadius: '12px',
                                        padding: '1.3rem 1.3rem',
                                    }}>
                                    <div>
                                        <IconInfo />
                                    </div>
                                    <p className="m-0 fs-14 color-555">
                                        You&#39;ll pay{' '}
                                        {formatAUD(formRequest.total)}. The
                                        price displayed is an estimation based
                                        on the current exchange rate. The amount
                                        you&#39;ll pay may change based on the
                                        exchange rate at the moment of the final
                                        payment.
                                    </p>
                                </div>
                            )}
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
