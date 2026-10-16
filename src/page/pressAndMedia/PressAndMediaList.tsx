'use client'
import useGeneralDataList from '@/hook/useGeneralDataList.hook'
import { getMediaPartner } from '@/service/api/contentPage.api'
import LoadingCardListData from '@/component/loading/LoadingCardListData'
import { isEmpty } from 'lodash'
import InfoNotAvailable from '@/component/general/InfoEmpty'
import Link from 'next/link'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import { BtnLinkBasic } from '@/component/general/Button'

const PressAndMediaList = () => {
    const { list, setList, isLoading, pagination } = useGeneralDataList({
        urlAPI: getMediaPartner,
    })

    return (
        <section className="section-space-small">
            <div className="container">
                {isLoading ? (
                    <LoadingCardListData />
                ) : !isEmpty(list) ? (
                    <>
                        <div className="row g-4">
                            {list.map((vm: any, index) => {
                                return (
                                    <div className="col-md-3" key={index}>
                                        <Link
                                            href={vm?.url || '#'}
                                            target={vm.url ? '_blank' : ''}
                                            className="w-100">
                                            <div className="border border-neutral-200 p-2">
                                                <div className="position-relative text-center px-2 w-100 h-258-px">
                                                    <Image
                                                        src={imgReelConfig(
                                                            vm.logo,
                                                        )}
                                                        alt={vm.name || ''}
                                                        fill
                                                        className="h-100 h-100 position-relative object-fit-contain"
                                                    />
                                                </div>

                                                <p className="fs-20 font-tt-drugs text-gray-400">
                                                    {vm.name}
                                                </p>
                                                <p className="fs-16 text-gray-200 fw-300 mb-0">
                                                    {vm.description}
                                                </p>

                                                <div className="pt-3">
                                                    <BtnLinkBasic>
                                                        Read Article
                                                    </BtnLinkBasic>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
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
