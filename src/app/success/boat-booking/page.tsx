import { ISLAND_GUIDE_PATH } from '@/config/pagePath.config'
import ThankYouPageTemplate from '@/page/@template/ThankYouPageTemplate'

const SuccessBoatBooking = () => {
    return (
        <ThankYouPageTemplate
            title="Thank you for your boat booking request!"
            description={
                <>
                    <p className="fs-16 text-white mb-4">
                        We’ve received your request. Our team will check
                        availability and get back to you within 24 hours with
                        confirmation and a quote.
                    </p>
                    <p className="fs-16 text-white">
                        While you’re here, start planning your Lembongan trip.
                        Explore our Island Guide for things to eat, see and do
                        across Nusa Lembongan & Ceningan.
                    </p>
                </>
            }
            button1={{
                label: 'Explore The Guide',
                path: ISLAND_GUIDE_PATH,
            }}
        />
    )
}

export default SuccessBoatBooking
