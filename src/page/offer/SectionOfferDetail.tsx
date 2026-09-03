import Breadcrumb from '@/component/general/Breadcrumb'
import {
    DescriptionContentText,
    TitleContentText,
} from '@/component/general/ContentText'

const SectionOfferDetail = () => {
    return (
        <>
            <section className="bg-white pt-5">
                <div className="container">
                    <Breadcrumb isLabelHome={false} />
                </div>
            </section>
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <TitleContentText className="pb-4">
                                Feeling the urge to escape but haven’t planned a
                                thing?
                            </TitleContentText>

                            <DescriptionContentText>
                                From now until September is the perfect time to
                                slip away to the island. Think slow mornings,
                                ocean air, and nowhere to be. A selection of our
                                villas currently have availability, with the
                                best rates when you book direct on our website.
                                Your island escape is waiting.
                            </DescriptionContentText>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionOfferDetail
