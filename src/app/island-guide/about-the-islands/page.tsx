import { getPageDetail } from '@/service/api/contentPage.api'
import IslandGuideAboutTheIslandTemplate from '@/page/@template/IslandGuideAboutTheIslandTemplate'
import { TEMPLATE_ISLAND_GUIDE_ABOUT_THE_ISLAND } from '@/config/pageTemplate.config'

const IslandGuideAboutTheIsland = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    // const { slug } = await params

    const contentPage = await getPageDetail('island-guide-about-the-islands')
        .then((res) => res?.result || {})
        .catch((err) => {
            return {}
        })

    const { template } = contentPage

    if (template == TEMPLATE_ISLAND_GUIDE_ABOUT_THE_ISLAND) {
        return <IslandGuideAboutTheIslandTemplate content={contentPage} />
    }
}

export default IslandGuideAboutTheIsland
