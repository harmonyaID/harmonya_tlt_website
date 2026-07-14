import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { BtnLinkBasic } from '@/component/general/Button'
import { SectionDescription } from '@/component/text/Paragraph'

const SectionHomeExclusiveStay = () => {
    return (
        <SectionGeneral>
            <div className="container">
                <div className="row justify-content-between gy-4">
                    <div className="col-lg-4">
                        <SectionTitle className="pb-4 font-tt-drugs text-uppercase">
                            EXCLUSIVE STAY
                        </SectionTitle>
                        <BtnLinkBasic className="btn-outline-grey-200 rounded-pill">
                            ALL PROPERTIES
                        </BtnLinkBasic>
                    </div>
                    <div className="col-lg-6">
                        <SectionDescription>
                            Ringed by crystal-clear turquoise waters and just 30
                            minutes from Bali. Wake to the sound of waves, the
                            warmth of tropical sun on your skin, and the distant
                            crow of a rooster drifting over from a nearby
                        </SectionDescription>
                    </div>
                </div>
            </div>
        </SectionGeneral>
    )
}

export default SectionHomeExclusiveStay
