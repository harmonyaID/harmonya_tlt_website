import PropertyVariantTemplate from '@/page/@template/PropertyVariantTemplate'
import { getPageDetail } from '@/service/api/contentPage.api'

const Page = async () => {
    const contentPage = await getPageDetail('stay')
        .then((res) => res?.result || {})
        .catch((err) => {
            return {}
        })

    const { template } = contentPage

    return (
        <>
            <PropertyVariantTemplate content={contentPage} />
        </>
    )
}

export default Page
