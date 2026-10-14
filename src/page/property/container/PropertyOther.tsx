import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getPropertyList } from '@/service/api/property.api'
import PropertyLoadingList from '@/page/property/component/PropertyLoadingList'
import { slugify } from '@/helper/slugify.helper'
import Link from 'next/link'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import PropertyAmities from '@/page/property/component/PropertyAmities'
import IconPropertyBad from '@/component/icon/IconPropertyBad'
import IconPropertyGuest from '@/component/icon/IconPropertyGuest'
import IconPropertyEat from '@/component/icon/IconPropertyEat'
import IconPropertyPool from '@/component/icon/IconPropertyPool'
import { BadgeTag } from '@/component/general/Badge'
import {
    IconPropertyBestPrice,
    IconPropertyNewResort,
} from '@/component/general/IconSvg'

const PropertyOther = ({ allSlug = [] }: { allSlug?: any }) => {
    const { list, isLoading } = useGeneralDataList({
        urlAPI: () =>
            getPropertyList({
                limit: 3,
                page: 1,
            }),
    })

    return (
        <section className="section-space-small bg-white">
            <div className="container">
                <div className="pb-4">
                    <p className="fs-40 text-uppercase text-center font-tt-drugs text-grey-400">
                        Other Properties
                    </p>
                </div>

                {isLoading ? (
                    <PropertyLoadingList />
                ) : (
                    <div className="row gx-3 gy-5">
                        {list.map((vm: any, index) => {
                            const { slug } = vm.seo || {}
                            const dataElement: any = vm
                            const dataTags = vm?.tags || []

                            const link =
                                allSlug && allSlug[0] && slug
                                    ? '/' + allSlug[0] + '/' + slugify(slug)
                                    : '#'

                            return (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <Link
                                        className="w-100 vstack gap-3 text-grey-200 position-relative wp-hover-image overflow-hidden property-card-slider"
                                        href={link}>
                                        <WrapImageHoverOverlay
                                            className="banner"
                                            contentOverlay={
                                                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                                    <BtnBasic className="btn-outline-white rounded-pill">
                                                        <div className="hstack align-items-center gap-1">
                                                            Explore{' '}
                                                            <CodeIconArrow />
                                                        </div>
                                                    </BtnBasic>
                                                </div>
                                            }>
                                            <Image
                                                src={imgReelConfig(
                                                    dataElement?.coverPhoto ||
                                                        PropertyVilla01,
                                                )}
                                                alt={
                                                    dataElement.nickname ||
                                                    'Property'
                                                }
                                                fill
                                                className="object-fit-cover"
                                            />
                                        </WrapImageHoverOverlay>

                                        <div className="">
                                            <p className="fs-20 text-primary mb-0">
                                                {dataElement?.category?.name ||
                                                    'Villa'}
                                            </p>

                                            <p className="fs-24 mb-1 wp-font-tt-drugs desc-two-line">
                                                {dataElement.nickname ||
                                                    'VILLA TANJUNG'}
                                            </p>
                                            <p className="fs-13 wp-font-tt-drugs mb-3">
                                                {dataElement.description ||
                                                    'Tamarind Bay'}
                                            </p>

                                            <div className="hstack gap-3 flex-wrap mb-3 text-grey-200">
                                                <PropertyAmities
                                                    icon={<IconPropertyBad />}
                                                    value={2}
                                                />
                                                <PropertyAmities
                                                    icon={<IconPropertyGuest />}
                                                    value={2}
                                                />
                                                <PropertyAmities
                                                    icon={<IconPropertyEat />}
                                                    value="Dine In"
                                                />
                                                <PropertyAmities
                                                    icon={<IconPropertyPool />}
                                                    value="Pool"
                                                />
                                            </div>

                                            <div className="hstack gap-2 flex-wrap">
                                                {dataTags.map(
                                                    (tag: any, idx: number) => (
                                                        <BadgeTag key={idx}>
                                                            {tag.name}
                                                        </BadgeTag>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        {/*Label*/}
                                        <div className="position-absolute top-0 end-0 pe-3">
                                            <div className="hstack gap-3">
                                                {vm.isPopular ? (
                                                    <IconPropertyBestPrice />
                                                ) : null}
                                                {vm.isNewVilla ? (
                                                    <IconPropertyNewResort />
                                                ) : null}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PropertyOther
