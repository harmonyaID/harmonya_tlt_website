'use client'
import usePropertyList from '@/page/property/hook/usePropertyList'
import PropertyLoadingList from '@/page/property/component/PropertyLoadingList'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import IconPropertyBad from '@/component/icon/IconPropertyBad'
import IconPropertyGuest from '@/component/icon/IconPropertyGuest'
import IconPropertyEat from '@/component/icon/IconPropertyEat'
import IconPropertyPool from '@/component/icon/IconPropertyPool'
import { BadgeTag } from '@/component/general/Badge'
import Link from 'next/link'
import PropertyAmities from '@/page/property/component/PropertyAmities'
import Pagination from '@/component/general/Pagination'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import SectionGeneral from '@/component/general/SectionGeneral'
import { SectionTitle } from '@/component/text/Heading'
import { usePathname } from 'next/navigation'
import { slugify } from '@/helper/slugify.helper'
import {
    IconPropertyBestPrice,
    IconPropertyNewResort,
} from '@/component/general/IconSvg'
import IconFilter from '@/component/icon/IconFilter'
import PropertyFormSelectBedRooms from '@/page/property/component/PropertyFormSelectBedRooms'
import { WrapFormContext } from '@/context/Form.Context'
import PropertyFormSelectBathRoom from '@/page/property/component/PropertyFormSelectBathRoom'
import { countTotalBeds } from '@/helper/count.helper'

const SectionListProperty = () => {
    const pathname = usePathname() || '/'

    const {
        list,
        isLoading,
        pagination,
        _handleChangePage,
        search,
        _handleChange,
    } = usePropertyList()

    console.log('search: ', search)

    return (
        <>
            <section className="section-space-small">
                <div className="container">
                    <SectionTitle className="font-tt-drugs mb-4">
                        ALL PROPERTIES
                    </SectionTitle>

                    <div className="row align-items-center pb-5 mb-4 pt-2">
                        <div className="col-auto">
                            <div className="hstack align-items-center gap-3">
                                <IconFilter />
                                <div className="">
                                    <p className="mb-0 fs-20 text-grey-400">
                                        FILTER
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto">
                            <div className="vr"></div>
                        </div>

                        <div className="col">
                            <div className="row gx-2 gy-3">
                                <WrapFormContext
                                    formRequest={search}
                                    actions={{
                                        change: _handleChange,
                                    }}>
                                    <div className="col-md-2">
                                        <PropertyFormSelectBedRooms
                                            value={search.bedroom}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <PropertyFormSelectBathRoom />
                                    </div>
                                </WrapFormContext>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <PropertyLoadingList />
                    ) : !isEmpty(list) ? (
                        <>
                            <div className="row gx-3 gy-5">
                                {list.map((vm: any, index) => {
                                    const { slug } = vm.seo || {}
                                    const dataElement: any = vm
                                    const dataTags = vm?.tags || []
                                    const listDetail = slug
                                        ? pathname + '/' + slugify(slug)
                                        : '#'
                                    return (
                                        <div
                                            className="col-lg-4 col-md-6"
                                            key={index}>
                                            <Link
                                                className="w-100 vstack gap-3 text-grey-200 position-relative wp-hover-image overflow-hidden property-card-slider"
                                                href={listDetail || '#'}>
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
                                                            dataElement?.coverPhoto,
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
                                                        {dataElement?.category
                                                            ?.name || ''}
                                                    </p>

                                                    <p className="fs-24 mb-1 wp-font-tt-drugs desc-two-line">
                                                        {dataElement.nickname ||
                                                            ''}
                                                    </p>
                                                    <p className="fs-13 wp-font-tt-drugs mb-3">
                                                        {dataElement.description ||
                                                            ''}
                                                    </p>

                                                    <div className="hstack gap-3 flex-wrap mb-3 text-grey-200">
                                                        <PropertyAmities
                                                            icon={
                                                                <IconPropertyBad />
                                                            }
                                                            value={
                                                                vm?.rooms
                                                                    ? countTotalBeds(
                                                                          vm.rooms,
                                                                      )
                                                                    : '0'
                                                            }
                                                        />
                                                        <PropertyAmities
                                                            icon={
                                                                <IconPropertyGuest />
                                                            }
                                                            value={vm.occupancy}
                                                        />
                                                        <PropertyAmities
                                                            icon={
                                                                <IconPropertyEat />
                                                            }
                                                            value="Dine In"
                                                        />
                                                        <PropertyAmities
                                                            icon={
                                                                <IconPropertyPool />
                                                            }
                                                            value="Pool"
                                                        />
                                                    </div>

                                                    <div className="hstack gap-2 flex-wrap">
                                                        {dataTags.map(
                                                            (
                                                                tag: any,
                                                                idx: number,
                                                            ) => (
                                                                <BadgeTag
                                                                    key={idx}>
                                                                    {tag.name}
                                                                </BadgeTag>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>

                                                {/*Label*/}
                                                <div className="position-absolute top-0 end-0 pe-3">
                                                    {/*<img*/}
                                                    {/*    src={*/}
                                                    {/*        IconPropertyBestPrice*/}
                                                    {/*    }*/}
                                                    {/*    className="w-auto"*/}
                                                    {/*    alt={vm.name}*/}
                                                    {/*/>*/}
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

                            <div className="py-4">
                                <Pagination
                                    // @ts-ignore
                                    pagination={pagination}
                                    onPageChange={(passPage) =>
                                        _handleChangePage(passPage)
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <InfoNotAvailable />
                    )}
                </div>
            </section>
        </>
    )
}

export default SectionListProperty
