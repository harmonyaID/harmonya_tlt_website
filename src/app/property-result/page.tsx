import PropertyVariantTemplate from '@/page/@template/PropertyVariantTemplate'
import { getPageDetail } from '@/service/api/contentPage.api'

type PropsData = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: PropsData) => {
    const query = await searchParams

    const contentPage = await getPageDetail('stay')
        .then((res) => res?.result || {})
        .catch((err) => {
            return {}
        })

    const { template } = contentPage

    return (
        <>
            <PropertyVariantTemplate content={contentPage} query={query} />
        </>
    )
}

export default Page
