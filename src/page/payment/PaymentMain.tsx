'use client'

import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import { WrapFormContext } from '@/context/Form.Context'
import FormWrap from '@/component/wrapping/Form.wrap'
import usePaymentBook from '@/page/payment/hook/usePaymentBook'
import PaymentFormGuest from '@/page/payment/container/PaymentFormGuest'
import { BtnLinkPrimary } from '@/component/general/Button'
import { PROPERTY_PATH, STAY_PATH } from '@/config/pagePath.config'
import PaymentSummary from '@/page/payment/container/PaymentSummary'

const PaymentMain = () => {
    const {
        formRequest,
        _handleChange,
        _handleSubmit,
        booking,
        isReady,
        isLoading,
        isExpired,
        isRetryPayment,
        error,
    } = usePaymentBook()

    return (
        <>
            <NavbarLayout />

            <section className="section-space-small mt-5">
                <div className="container pt-5">
                    <div className="pb-5">
                        <Breadcrumb isLabelHome />
                    </div>

                    {isReady && !booking ? (
                        <div className="text-center py-5">
                            <p className="fs-24 text-grey-300">
                                No booking in progress. Please choose your dates
                                on a property page first.
                            </p>
                            <BtnLinkPrimary href={STAY_PATH}>
                                Browse properties
                            </BtnLinkPrimary>
                        </div>
                    ) : isReady && isExpired ? (
                        <div className="text-center py-5">
                            <p className="fs-24 text-grey-300">
                                Your price quote has expired. Please search your
                                dates again to get the latest price.
                            </p>
                            <BtnLinkPrimary href={STAY_PATH}>
                                Browse properties
                            </BtnLinkPrimary>
                        </div>
                    ) : (
                        <FormWrap actions={{ handleSubmit: _handleSubmit }}>
                            <WrapFormContext
                                formRequest={formRequest}
                                actions={{ change: _handleChange }}>
                                <div className="row justify-content-between gy-5">
                                    <div className="col-lg-6 col-md-7">
                                        <PaymentFormGuest
                                            formRequest={formRequest}
                                            onChange={_handleChange}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-5">
                                        <PaymentSummary
                                            booking={booking}
                                            isLoading={isLoading}
                                            isCard={
                                                formRequest.paymentMethod ===
                                                'credit_card'
                                            }
                                            isRetryPayment={isRetryPayment}
                                            error={error}
                                        />
                                    </div>
                                </div>
                            </WrapFormContext>
                        </FormWrap>
                    )}
                </div>
            </section>

            <FooterLayout />
        </>
    )
}

export default PaymentMain
