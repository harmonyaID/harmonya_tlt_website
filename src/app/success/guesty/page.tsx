import {
    BOAT_TRANSFERS_PATH,
    ISLAND_GUIDE_PATH,
} from '@/config/pagePath.config'
import ThankYouPageTemplate from '@/page/@template/ThankYouPageTemplate'
import GuestyBookingConfirmation from '@/page/payment/component/GuestyBookingConfirmation'

const SuccessGuestyBooking = () => {
    return (
        <ThankYouPageTemplate
            title="THANK YOU FOR BOOKING WITH US!"
            description={
                <>
                    <GuestyBookingConfirmation />
                    <p className="fs-16 text-white">
                        Ready to plan your trip? Book your boat transfer with us
                        and enjoy 20% off, or start exploring our Island Guide
                        for things to eat, see and do.
                    </p>
                </>
            }
            button1={{
                label: 'EXPLORE THE ISLAND GUIDE',
                path: ISLAND_GUIDE_PATH,
            }}
            button2={{
                label: 'BOOK YOUR BOAT TRANSFER',
                path: BOAT_TRANSFERS_PATH,
            }}
        />
    )
}

export default SuccessGuestyBooking
