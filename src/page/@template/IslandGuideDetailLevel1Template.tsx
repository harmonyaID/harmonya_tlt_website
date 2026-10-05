import { getDetailIslandGuideTypes } from '@/service/api/islandGuide.api'
import IslandGuideDetailLevel1OfPage from '@/page/islandGuide/IslandGuideDetailLevel1OfPage'
import IslandGuideDetailLevel1 from '@/page/islandGuide/IslandGuideDetailLevel1'
import NotFoundTemplate from '@/page/@template/NotFoundTemplate'

const IslandGuideDetailLevel1Template = async ({ slug }: { slug: string }) => {
    const typeDetail = await getDetailIslandGuideTypes('5').then(
        (res) => res?.result || {},
    )

    console.log('typeDetail: ', typeDetail)

    const { isPage, id } = typeDetail || {}

    if (id) {
        return isPage ? (
            <IslandGuideDetailLevel1OfPage detail={typeDetail} />
        ) : (
            <IslandGuideDetailLevel1 detail={typeDetail} />
        )
    }

    return <NotFoundTemplate />
}

export default IslandGuideDetailLevel1Template
