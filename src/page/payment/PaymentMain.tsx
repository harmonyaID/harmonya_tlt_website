'use client'

import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'
import Breadcrumb from '@/component/general/Breadcrumb'
import { WrapFormContext } from '@/context/Form.Context'
import FormWrap from '@/component/wrapping/Form.wrap'
import usePaymentBook from '@/page/payment/hook/usePaymentBook'
import PaymentFormGuest from '@/page/payment/container/PaymentFormGuest'
import PaymentSummary from '@/page/payment/container/PaymentSummary'

const PaymentMain = () => {
    const { formRequest, _handleChange } = usePaymentBook()

    return (
        <>
            <NavbarLayout />

            <section className="section-space-small mt-5">
                <div className="container pt-5">
                    <div className="pb-5">
                        <Breadcrumb isLabelHome />
                    </div>

                    <FormWrap>
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
                                    <PaymentSummary />
                                </div>
                            </div>
                        </WrapFormContext>
                    </FormWrap>
                </div>
            </section>

            <FooterLayout />
        </>
    )
}

export default PaymentMain
