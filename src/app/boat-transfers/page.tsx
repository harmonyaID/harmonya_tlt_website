import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import BoatTransferMain from '@/page/boatTransfer/BoatTransferMain'
import { getBoatDetail, getBoatList } from '@/service/api/boatTransfer.api'

const BoatTransfersPage = async () => {
    return (
        <TemplatePageBaseLayout title="Boat Transfer" backgroundImage={BGHero}>
            <BoatTransferMain />
        </TemplatePageBaseLayout>
    )
}

export default BoatTransfersPage
