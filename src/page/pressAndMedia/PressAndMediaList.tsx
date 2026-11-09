'use client'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getMediaPartner } from '@/service/api/contentPage.api'
import LoadingCardListData from '@/component/loading/LoadingCardListData'
import { isEmpty } from 'lodash'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import Link from 'next/link'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import { BtnBasic, BtnIcon, BtnLinkBasic } from '@/component/general/Button'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper'
import Pagination from '@/component/general/Pagination'

const PressAndMediaList = () => {
    const { list, setList, isLoading, pagination, _handleChangePage } =
        useGeneralDataList({
            urlAPI: getMediaPartner,
        })

    return (
        <section className="section-space-small">
            <div className="container">
                {isLoading ? (
                    <LoadingCardListData />
                ) : !isEmpty(list) ? (
                    <>
                        <div className="row g-4 gy-5">
                            {list.map((vm: any, index) => {
                                return (
                                    <div className="col-md-3" key={index}>
                                        <Link
                                            href={vm?.url || '#'}
                                            target={vm.url ? '_blank' : ''}
                                            className="w-100">
                                            <div className="border border-neutral-200 px-3 pt-3 pb-4 h-100">
                                                <div className="vstack gap-2 h-100">
                                                    <div className="position-relative text-center w-100 h-258-px">
                                                        <Image
                                                            src={imgReelConfig(
                                                                vm.featuredImage,
                                                            )}
                                                            alt={vm.name || ''}
                                                            fill
                                                            className="h-100 h-100 position-relative object-fit-cover"
                                                        />
                                                    </div>
                                                    <p className="font-tt-drugs mb-0 fs-16 text-neutral-400 mt-3">
                                                        {actionFormatDateStrict(
                                                            vm.date,
                                                            'MMMM DD, YYYY',
                                                            'DD/MM/YYYY HH:ii',
                                                        )}
                                                    </p>

                                                    <p className="fs-20 font-tt-drugs text-gray-400 mb-0 fw-semibold text-uppercase">
                                                        {vm.name}
                                                    </p>
                                                    <p className="fs-20 font-tt-drugs text-gray-400 mb-0 text-uppercase mt-3">
                                                        {vm.title}
                                                    </p>
                                                    <p className="fs-16 text-neutral-500 fw-300 mb-0 fw-light">
                                                        {vm.description}
                                                    </p>

                                                    <div className="mt-auto">
                                                        <BtnBasic className="btn-outline-gray-200 rounded-pill">
                                                            <BtnIcon>
                                                                Read Article
                                                            </BtnIcon>
                                                        </BtnBasic>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-5">
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
    )
}

export default PressAndMediaList
