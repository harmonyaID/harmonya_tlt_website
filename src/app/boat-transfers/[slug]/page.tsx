import TemplatePageBaseLayout from '@/component/layout/TemplatePageBase.layout'
import BoatTransferDetail from '@/page/boatTransfer/BoatTransferDetail'
import BGHero from '@/asset/image/dummy/offer-last-bg-hero-half.jpg'
import { getBlogDetail } from '@/service/api/blog.api'
import { getBoatDetail } from '@/service/api/boatTransfer.api'
import SEOBasicGeneral from '@/component/seo/SEOBasicGeneral'

const BoatTransferDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params

    const dataBoat = await getBoatDetail(slug, 'tcGetBoatDetail').then(
        (res) => res?.result || {},
    )

    const seo = dataBoat?.seo || {}

    return (
        <TemplatePageBaseLayout title={slug} backgroundImage={BGHero}>
            <SEOBasicGeneral seo={seo} />

            <BoatTransferDetail detail={dataBoat} />
        </TemplatePageBaseLayout>
    )
}

export default BoatTransferDetailPage
