'use client'
import moment from 'moment'
import {
    BOOKING_RESULT_STORAGE_KEY,
    GuestyBookingResult,
    formatMoney,
} from '@/helper/guestyBooking.helper'
import useSessionStorageJson from '@/hook/useSessionStorageJson.hook'

const MESSAGE: Record<GuestyBookingResult['status'], string> = {
    paid: 'Thank you for your booking! Your payment was successful and your booking is confirmed. Check your inbox for your confirmation and stay details.',
    processing:
        'Thank you for your booking! Your payment is being processed. You will receive a confirmation email once it is completed.',
    pending_auth:
        'Your bank requires additional verification. Please complete the authentication in the new window to finish your payment.',
    reserved:
        'Your stay has been pre-reserved for 48 hours. Someone from our team will reach out with bank transfer instructions.',
}

const fmtDate = (d?: string) =>
    d ? moment(d, 'YYYY-MM-DD').format('D MMM YYYY') : ''

// Ringkasan hasil booking Guesty (dibaca dari sessionStorage)
const GuestyBookingConfirmation = () => {
    const { value: result } = useSessionStorageJson<GuestyBookingResult>(
        BOOKING_RESULT_STORAGE_KEY,
    )

    if (!result) {
        return (
            <p className="fs-16 text-white">
                Thank you for your booking! Check your inbox for your
                confirmation and stay details.
            </p>
        )
    }

    return (
        <>
            <p className="fs-16 text-white">{MESSAGE[result.status]}</p>

            <div className="fs-16 text-white pb-3">
                {result.confirmationCode ? (
                    <p className="mb-1">
                        Confirmation code:{' '}
                        <strong>{result.confirmationCode}</strong>
                    </p>
                ) : null}
                {result.propertyName ? (
                    <p className="mb-1">{result.propertyName}</p>
                ) : null}
                {result.checkIn && result.checkOut ? (
                    <p className="mb-1">
                        {fmtDate(result.checkIn)} → {fmtDate(result.checkOut)}
                    </p>
                ) : null}
                {result.total ? (
                    <p className="mb-0">
                        Total: {formatMoney(result.total, result.currency)}
                    </p>
                ) : null}
            </div>
        </>
    )
}

export default GuestyBookingConfirmation
