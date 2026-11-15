import { getDetailIslandGuideTypes } from '@/service/api/islandGuide.api'
import IslandGuideDetailLevel1OfPage from '@/page/islandGuide/IslandGuideDetailLevel1OfPage'
import IslandGuideDetailLevel1 from '@/page/islandGuide/IslandGuideDetailLevel1'
import NotFoundTemplate from '@/page/@template/NotFoundTemplate'

const IslandGuideDetailLevel1Template = async ({ slug }: { slug: string }) => {
    const typeDetail = await getDetailIslandGuideTypes(slug).then(
        (res) => res?.result || {},
    )

    // console.log('typeDetail: ', slug)

    const { isPage, id } = typeDetail || {}

    if (id) {
        console.log('isPage: ', isPage)
        return isPage ? (
            <IslandGuideDetailLevel1OfPage detail={typeDetail} />
        ) : (
            <IslandGuideDetailLevel1 detail={typeDetail} />
        )
    }

    return <NotFoundTemplate />
}

export default IslandGuideDetailLevel1Template
