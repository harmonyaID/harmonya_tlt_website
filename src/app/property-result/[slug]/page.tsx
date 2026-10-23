import PropertyVariantDetailTemplate from '@/page/@template/PropertyVariantDetailTemplate'

type PropsData = {
    params: Promise<{ slug: string }>
    [key: string]: any
}

const Page = async ({ params }: PropsData) => {
    const { slug } = await params

    console.log('slug: ', slug)

    return (
        <>
            <PropertyVariantDetailTemplate slug={slug} allSlug={slug} />
        </>
    )
}

export default Page
