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

const SectionListProperty = () => {
    const { list, isLoading, pagination, _handleChangePage } = usePropertyList()
    console.log('list: ', list)

    return (
        <>
            <SectionGeneral>
                <div className="container">
                    <SectionTitle className="font-tt-drugs mb-5">
                        ALL PROPERTIES
                    </SectionTitle>

                    {isLoading ? (
                        <PropertyLoadingList />
                    ) : !isEmpty(list) ? (
                        <>
                            <div className="row gx-3 gy-4">
                                {list.map((vm: any, index) => {
                                    const dataElement: any = vm
                                    const dataTags = vm?.tags || []
                                    return (
                                        <div
                                            className="col-lg-4 col-md-6"
                                            key={index}>
                                            <Link
                                                className="w-100 vstack gap-3 text-grey-200 wp-hover-image overflow-hidden property-card-slider"
                                                href={
                                                    dataElement.buttonLink ||
                                                    '#'
                                                }>
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
                                                        {dataElement?.category
                                                            ?.name || 'Villa'}
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
                                                            icon={
                                                                <IconPropertyBad />
                                                            }
                                                            value={2}
                                                        />
                                                        <PropertyAmities
                                                            icon={
                                                                <IconPropertyGuest />
                                                            }
                                                            value={2}
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
                                                                    {tag}
                                                                </BadgeTag>
                                                            ),
                                                        )}
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
            </SectionGeneral>
        </>
    )
}

export default SectionListProperty
