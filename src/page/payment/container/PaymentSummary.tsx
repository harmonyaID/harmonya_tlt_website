import { Calendar, Info, Share2, User, Mail } from 'feather-icons-react'
import { BtnPrimary } from '@/component/general/Button'

const Row = ({ label, children, icon }: any) => (
    <div className="pb-2 border-bottom">
        <p className="fs-14 fw-600 text-grey-200 text-uppercase mb-1">
            {label}
        </p>
        <div className="d-flex justify-content-between align-items-center fs-12 text-grey-300">
            <span>{children}</span>
            {icon}
        </div>
    </div>
)

const Tag = ({ children }: { children: string }) => (
    <span className="border border-grey-300 rounded-1 px-2 fs-10 text-grey-300">
        {children}
    </span>
)

// Data masih dummy (slicing layout), nanti diisi dari quote Guesty
const PaymentSummary = () => (
    <div className="p-4 border border-neutral-200 rounded-4">
        <p className="fs-18 font-tt-drugs fw-600 text-grey-200 text-uppercase">
            Villa Tanjung - 4 Bedrooms
        </p>

        <div className="vstack gap-3">
            <Row
                label="Check-in & Check-out"
                icon={<Calendar size="14" />}>
                2 Feb 2027 → 4 Feb 2027
            </Row>

            <Row label="Guest" icon={<User size="14" />}>
                2 Adults
            </Row>

            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
                <span className="fs-14 fw-600 text-grey-200 text-uppercase">
                    Price
                </span>
                <span className="text-grey-200">
                    <span className="fs-20">A$6,750.00</span>{' '}
                    <span className="fs-12">/Night</span>
                </span>
            </div>

            <div className="vstack gap-2">
                <div className="d-flex justify-content-between fs-12 text-grey-300">
                    <span className="text-uppercase fw-600 text-grey-200">
                        Fee
                    </span>
                    <span>A$ 185.63</span>
                </div>
                <div className="hstack gap-2">
                    <Tag>Non-Refundable</Tag>
                    <Tag>Breakfast Included</Tag>
                </div>
                <label className="hstack gap-1 fs-12 text-grey-300">
                    <input type="checkbox" className="form-check-input mt-0" />
                    I Have A Coupon
                </label>
            </div>

            <div className="d-flex justify-content-between align-items-start pt-3 border-top">
                <span className="fs-14 fw-600 text-grey-200 text-uppercase">
                    Total
                </span>
                <div className="text-end">
                    <p className="fs-24 text-grey-200 mb-0">A$6,935.63</p>
                    <p className="fs-12 text-grey-300 mb-0">For 4 Nights Stay</p>
                </div>
            </div>

            <div className="hstack gap-2 align-items-start rounded-3 p-3 bg-primary-subtle fs-12 text-grey-300">
                <Info size="14" className="flex-shrink-0 mt-1 text-primary" />
                <p className="mb-0">
                    You&apos;ll pay <strong>A$5,779.69</strong>. The price
                    displayed is an estimation based on the current exchange
                    rate. The amount you&apos;ll pay may change based on the
                    exchange rate at the moment of the final payment.
                </p>
            </div>

            <BtnPrimary
                type="submit"
                className="w-100 text-uppercase font-tt-drugs">
                Book Now
            </BtnPrimary>

            <hr className="m-0" />

            <div className="row g-2">
                <div className="col-6">
                    <BtnPrimary
                        type="button"
                        className="rounded-pill w-100 text-uppercase fs-14">
                        Share <Share2 size="14" />
                    </BtnPrimary>
                </div>
                <div className="col-6">
                    <BtnPrimary
                        type="button"
                        isOutline
                        className="rounded-pill w-100 text-uppercase fs-14">
                        <Mail size="14" /> Ask Question
                    </BtnPrimary>
                </div>
            </div>
        </div>
    </div>
)

export default PaymentSummary
