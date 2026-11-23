import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.Context'
import FormRangeDatepicker from '@/component/form/FormRangeDatepicker'
import { BtnPrimary } from '@/component/general/Button'
import { ReactNode } from 'react'
import FormInput from '@/component/form/FormInput'
import usePropertyVariantBooking from '@/page/propertyVariant/hook/usePropertyVariantBooking.hook'
import { formatMoney } from '@/helper/guestyBooking.helper'

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
    const {
        formRequest,
        booking,
        error,
        isLoading,
        _handleChange,
        _handleSubmit,
        _handleBookNow,
    } = usePropertyVariantBooking(
        propertyVariant?.guestyId || '',
        propertyVariant?.nickname || '',
    )

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
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        className="rounded-pillP w-100 text-uppercase">
                        Search
                    </BtnPrimary>
                </FormWrap>

                {error ? (
                    <p className="fs-14 text-danger mt-3 mb-0">{error}</p>
                ) : null}

                {booking ? (
                    <div className="vstack gap-2 mt-4">
                        <div className="d-flex justify-content-between fs-14 text-grey-300">
                            <span>
                                {formatMoney(
                                    booking.accommodation / booking.nights,
                                    booking.currency,
                                )}{' '}
                                x {booking.nights} night
                                {booking.nights > 1 ? 's' : ''}
                            </span>
                            <span>
                                {formatMoney(
                                    booking.accommodation,
                                    booking.currency,
                                )}
                            </span>
                        </div>
                        {booking.fees > 0 ? (
                            <div className="d-flex justify-content-between fs-14 text-grey-300">
                                <span>Fees</span>
                                <span>
                                    {formatMoney(
                                        booking.fees,
                                        booking.currency,
                                    )}
                                </span>
                            </div>
                        ) : null}
                        {booking.taxes > 0 ? (
                            <div className="d-flex justify-content-between fs-14 text-grey-300">
                                <span>Taxes</span>
                                <span>
                                    {formatMoney(
                                        booking.taxes,
                                        booking.currency,
                                    )}
                                </span>
                            </div>
                        ) : null}
                        <div className="d-flex justify-content-between pt-2 border-top text-grey-200">
                            <span className="fs-14 fw-600 text-uppercase">
                                Total
                            </span>
                            <span className="fs-24">
                                {formatMoney(booking.total, booking.currency)}
                            </span>
                        </div>
                        <BtnPrimary
                            type="button"
                            handle={_handleBookNow}
                            className="w-100 text-uppercase mt-2">
                            Book Now
                        </BtnPrimary>
                    </div>
                ) : null}

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
