import { HOME_PATH, ISLAND_GUIDE_PATH } from '@/config/pagePath.config'
import ThankYouPageTemplate from '@/page/@template/ThankYouPageTemplate'

const SuccessBoatBooking = () => {
    return (
        <ThankYouPageTemplate
            title="Thanks for getting in touch!"
            description={
                <>
                    <p className="fs-16 text-white">
                        We’ve received your message and our team will get back
                        to you as soon as possible.
                    </p>
                </>
            }
            button1={{
                label: 'EXPLORE THE ISLAND GUIDE',
                path: ISLAND_GUIDE_PATH,
            }}
            button2={{
                label: 'Back to home',
                path: HOME_PATH,
            }}
        />
    )
}

export default SuccessBoatBooking
