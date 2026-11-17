import {
    BOAT_TRANSFERS_PATH,
    ISLAND_GUIDE_PATH,
} from '@/config/pagePath.config'
import ThankYouPageTemplate from '@/page/@template/ThankYouPageTemplate'

const SuccessBoatBooking = () => {
    return (
        <ThankYouPageTemplate
            title="THANK YOU FOR YOUR BOOKING REQUEST"
            description={
                <>
                    <p className="fs-16 text-white">
                        We’ve received your request. Our team will check
                        availability and get back to you within 24 hours with
                        confirmation and a quote.
                    </p>
                    <p className="fs-16 text-white">
                        Ready to plan your trip? Book your boat transfer with us
                        and enjoy 20% off, or explore our Island Guide for
                        things to eat, see and do.
                    </p>
                </>
            }
            button1={{
                label: 'Explore The Guide',
                path: ISLAND_GUIDE_PATH,
            }}
            button2={{
                label: 'Book Your Transfer',
                path: BOAT_TRANSFERS_PATH,
            }}
        />
    )
}

export default SuccessBoatBooking
