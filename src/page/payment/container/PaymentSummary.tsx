import { Calendar, Info, Share2, User, Mail } from 'feather-icons-react'
import { BtnPrimary } from '@/component/general/Button'
import { GuestyBooking, formatMoney } from '@/helper/guestyBooking.helper'
import moment from 'moment'

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

const fmtDate = (d: string) => moment(d, 'YYYY-MM-DD').format('D MMM YYYY')

const PaymentSummary = ({
    booking,
    isLoading = false,
    error = '',
}: {
    booking: GuestyBooking | null
    isLoading?: boolean
    error?: string
}) => {
    if (!booking) return null
    const money = (v: number) => formatMoney(v, booking.currency)

    return (
        <div className="p-4 border border-neutral-200 rounded-4">
            <p className="fs-18 font-tt-drugs fw-600 text-grey-200 text-uppercase">
                {booking.propertyName}
            </p>

            <div className="vstack gap-3">
                <Row label="Check-in & Check-out" icon={<Calendar size="14" />}>
                    {fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}
                </Row>

                <Row label="Guest" icon={<User size="14" />}>
                    {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                </Row>

                <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
                    <span className="fs-14 fw-600 text-grey-200 text-uppercase">
                        Price
                    </span>
                    <span className="text-grey-200">
                        <span className="fs-20">
                            {money(booking.accommodation / booking.nights)}
                        </span>{' '}
                        <span className="fs-12">/Night</span>
                    </span>
                </div>

                <div className="vstack gap-2">
                    {booking.fees > 0 ? (
                        <div className="d-flex justify-content-between fs-12 text-grey-300">
                            <span className="text-uppercase fw-600 text-grey-200">
                                Fee
                            </span>
                            <span>{money(booking.fees)}</span>
                        </div>
                    ) : null}
                    {booking.taxes > 0 ? (
                        <div className="d-flex justify-content-between fs-12 text-grey-300">
                            <span className="text-uppercase fw-600 text-grey-200">
                                Taxes
                            </span>
                            <span>{money(booking.taxes)}</span>
                        </div>
                    ) : null}
                </div>

                <div className="d-flex justify-content-between align-items-start pt-3 border-top">
                    <span className="fs-14 fw-600 text-grey-200 text-uppercase">
                        Total
                    </span>
                    <div className="text-end">
                        <p className="fs-24 text-grey-200 mb-0">
                            {money(booking.total)}
                        </p>
                        <p className="fs-12 text-grey-300 mb-0">
                            For {booking.nights} Night
                            {booking.nights > 1 ? 's' : ''} Stay
                        </p>
                    </div>
                </div>

                {error ? (
                    <p className="fs-14 text-danger mb-0">{error}</p>
                ) : null}

                <BtnPrimary
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={isLoading}
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
}

export default PaymentSummary
