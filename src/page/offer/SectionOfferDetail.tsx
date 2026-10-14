import Breadcrumb from '@/component/general/Breadcrumb'
import RenderHtml from '@/component/general/RenderHtml'
import SectionContent from '@/component/general/SectionContent'
import Link from 'next/link'
import { BtnBasic, CodeIconArrow } from '@/component/general/Button'
import Image from 'next/image'
import { imgReelConfig } from '@/config/urlImage.config'
import PropertyVilla01 from '@/asset/image/villa/property-villa-01.png'
import { WrapImageHoverOverlay } from '@/component/general/WrapImage'
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

const SectionOfferDetail = ({ detail = {} }: { detail?: any }) => {
    const properties = detail?.properties || []

    return (
        <>
            <section className="bg-white pt-5">
                <div className="container">
                    <Breadcrumb isLabelHome />
                </div>
            </section>
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 wp-content-blog">
                            {detail?.excerpt ? (
                                <SectionContent>
                                    <RenderHtml
                                        className="render-content"
                                        html={detail.excerpt}
                                    />
                                </SectionContent>
                            ) : null}

                            {detail?.content ? (
                                <SectionContent isBorderBottom={false}>
                                    <RenderHtml
                                        className="render-content"
                                        html={detail?.content || ''}
                                    />
                                </SectionContent>
                            ) : null}

                            <div className="py-4 row gx-3 gy-5">
                                {properties.map((vm, index) => {
                                    const { canonicalUrl } = vm?.seo || {}
                                    const dataTags = vm?.tags || []
                                    return (
                                        <div
                                            key={index}
                                            className="col-lg-4 col-md-6">
                                            <Link
                                                className="w-100 vstack gap-3 text-grey-200 position-relative wp-hover-image overflow-hidden property-card-slider"
                                                href={canonicalUrl || '#'}>
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
                                                            vm?.coverPhoto ||
                                                                PropertyVilla01,
                                                        )}
                                                        alt={
                                                            vm.nickname ||
                                                            'Property'
                                                        }
                                                        fill
                                                        className="object-fit-cover"
                                                    />
                                                </WrapImageHoverOverlay>

                                                <div className="">
                                                    <p className="fs-20 text-primary mb-0">
                                                        {vm?.category?.name ||
                                                            'Villa'}
                                                    </p>

                                                    <p className="fs-24 mb-1 wp-font-tt-drugs desc-two-line">
                                                        {vm.nickname || ''}
                                                    </p>
                                                    {/*<p className="fs-13 wp-font-tt-drugs mb-3">*/}
                                                    {/*    {vm.description || '-'}*/}
                                                    {/*</p>*/}

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

                                                    {/*<div className="hstack gap-2 flex-wrap">*/}
                                                    {/*    {dataTags.map(*/}
                                                    {/*        (*/}
                                                    {/*            tag: any,*/}
                                                    {/*            idx: number,*/}
                                                    {/*        ) => (*/}
                                                    {/*            <BadgeTag*/}
                                                    {/*                key={idx}>*/}
                                                    {/*                {tag.name}*/}
                                                    {/*            </BadgeTag>*/}
                                                    {/*        ),*/}
                                                    {/*    )}*/}
                                                    {/*</div>*/}
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionOfferDetail
