'use client'
import { usePathname } from 'next/navigation'
import { slugify } from '@/helper/slugify.helper'
import {
    IslandSectionContentAndImage,
    IslandSectionImageAndContent,
} from '@/page/islandGuide/component/IslandGuideSectionType'

const IslandGuideTypeList = ({ list = [] }: { list?: any }) => {
    const pathname = usePathname() || '/'
    console.log('list: ', list)
    console.log('pathname: ', pathname)

    return (
        <>
            {list.length > 0 ? (
                <>
                    {list.map((vm: any, index: number) => {
                        const number = index + 1
                        const isSectionImageAndContent = number % 2 !== 0
                        const { slug } = vm?.seo || {}

                        const dataProps = {
                            title: vm.name || '',
                            subTitle: '',
                            description: vm.description || '',
                            link: slug ? pathname + '/' + slugify(slug) : '#',
                            image: vm.featuredImage || '',
                        }

                        if (isSectionImageAndContent) {
                            return (
                                <IslandSectionImageAndContent
                                    key={index}
                                    {...dataProps}
                                />
                            )
                        }

                        return (
                            <IslandSectionContentAndImage
                                key={index}
                                {...dataProps}
                            />
                        )
                    })}
                </>
            ) : null}
        </>
    )
}

export default IslandGuideTypeList
