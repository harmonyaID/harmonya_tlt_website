import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import Image from 'next/image'
import { BtnLinkBasic } from '@/component/general/Button'
import Banner from '@/asset/image/villa/feature-banner.jpg'

const SectionVillaFeatureStay = () => {
    return (
        <section className="bg-neutral-100 section-space-small">
            <div className="container">
                <div className="row gx-5 justify-content-between">
                    <div className="col-md-6 px-5">
                        <Image
                            src={Banner}
                            className="w-100 h-100 object-cover"
                            alt="villa stay"
                        />
                    </div>
                    <div className="col-md-6 py-5 px-5">
                        <p className="fs-16 text-green-300">Featured Stay</p>
                        <SectionTitle className="font-tt-drugs pb-3">
                            ARNA SUITES & OCEAN LOUNGE
                        </SectionTitle>
                        <p className="mb-0 text-grey-100 fs-16">
                            Inspired by the carefree spirit of the Australian
                            beach house, Capella Lodge has nine contemporary,
                            island-styled suites designed to reflect Lord Howe’s
                            pristine natural environment. Capella Lodge is the
                            only island accommodation that offers spectacular
                            views of the Pacific Ocean and towering
                        </p>

                        <BtnLinkBasic className="btn-outline-grey-100 mt-5 rounded-pill">
                            RESORT DETAILS
                        </BtnLinkBasic>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionVillaFeatureStay
