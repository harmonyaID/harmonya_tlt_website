'use client'
import useExpAreaListHook from '@/page/experience/hook/useExpAreaList.hook'
import Link from 'next/link'
import { imgReelConfig } from '@/config/urlImage.config'
import Image from 'next/image'
import { slugify } from '@/helper/slugify.helper'
import { usePathname } from 'next/navigation'

const SectionExpAreaList = ({ slug = '' }: { slug?: string | number }) => {
    const pathname = usePathname() || '/'

    const { list, isLoading, pagination, _handleChangePage } =
        useExpAreaListHook({
            configSearch: {
                typeId: slug,
            },
        })

    return (
        <>
            {!isLoading && list.length ? (
                <section className="section-space-small-bottom">
                    <div className="container">
                        <div className="row gy-4">
                            {list.map((vm: any, index: any) => {
                                const { slug } = vm?.seo || {}
                                return (
                                    <div className="col-md-3" key={index}>
                                        <Link
                                            href={
                                                slug
                                                    ? pathname +
                                                      '/' +
                                                      slugify(slug)
                                                    : '#'
                                            }
                                            className="">
                                            <div className="exp-area-card-img wp-hover-image">
                                                <Image
                                                    src={imgReelConfig(
                                                        vm.banner,
                                                    )}
                                                    alt={vm.name || 'Area'}
                                                    fill
                                                    className="object-fit-cover"
                                                />
                                                <div className="overlay-area hstack justify-content-center align-items-center">
                                                    <p className="font-tt-drugs mb-0 fs-32 text-white text-center fw-light">
                                                        {vm.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    )
}

export default SectionExpAreaList
