'use client'

import NavbarLayout from '@/component/layout/Navbar.layout'
import FooterLayout from '@/component/layout/Footer.layout'

const PaymentMain = () => (
    <>
        <NavbarLayout isBgTransparent isStartFix />

        <section className="section-space-small">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-5">
                        <h1 className="text-grey-400 text-uppercase font-tt-drugs">
                            Guest information
                        </h1>
                    </div>

                    <div className="col-md-5"></div>
                </div>
            </div>
        </section>

        <FooterLayout />
    </>
)

export default PaymentMain
