import {
    BOAT_TRANSFERS_PATH,
    ISLAND_GUIDE_PATH,
} from '@/config/pagePath.config'
import ThankYouPageTemplate from '@/page/@template/ThankYouPageTemplate'

const SuccessBoatBooking = () => {
    return (
        <ThankYouPageTemplate
            title="THANK YOU FOR BOOKING WITH US!"
            description={
                <>
                    <p className="fs-16 text-white">
                        Thank you for your booking! Your booking is confirmed.
                        Check your inbox for your confirmation and stay details.
                    </p>
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

export default SuccessBoatBooking
