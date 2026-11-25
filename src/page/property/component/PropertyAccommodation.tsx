import Link from 'next/link'
import ValidImage from '@/component/general/ValidImage'
import PropertyAmities from '@/page/property/component/PropertyAmities'
import IconPropertyBad from '@/component/icon/IconPropertyBad'
import IconPropertyGuest from '@/component/icon/IconPropertyGuest'
import { imgReelConfig } from '@/config/urlImage.config'
import { slugify } from '@/helper/slugify.helper'
import { PropertyAccommodationItem } from '@/page/property/hook/usePropertyAccommodation'

const formatPrice = (price?: number | null, currency?: string | null) => {
    if (price === null || price === undefined || !(Number(price) > 0))
        return ''
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'AUD',
        }).format(Number(price))
    } catch {
        return String(price)
    }
}

const PropertyAccommodation = ({
    list = [],
    isLoading = false,
}: {
    list?: PropertyAccommodationItem[]
    isLoading?: boolean
}) => {
    if (isLoading)
        return <p className="text-grey-100 pt-3 mb-0">Loading accommodation…</p>

    return (
        <div className="vstack gap-3 pt-3">
            {list.map((item) => {
                const price = formatPrice(item.price, item.currency)
                const href = item.slug
                    ? '/property-result/' + slugify(item.slug)
                    : '#'

                return (
                    <Link
                        key={item.id}
                        href={href}
                        className="d-block text-grey-200 text-decoration-none border border-neutral-200 rounded-4 p-3">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-5">
                                <div className="position-relative w-100 ratio ratio-4x3 overflow-hidden rounded-3">
                                    <ValidImage
                                        src={item.coverPhoto}
                                        fallbackSrc={imgReelConfig()}
                                        alt={item.nickname || 'Accommodation'}
                                        fill
                                        className="object-fit-cover"
                                    />
                                </div>
                            </div>

                            <div className="col-md-7">
                                <div className="row g-3">
                                    <div className="col-lg-7">
                                        <p className="fs-20 text-uppercase font-tt-drugs mb-3">
                                            {item.nickname}
                                        </p>

                                        <div className="vstack gap-2 mb-3 fs-14">
                                            {item.bedrooms ? (
                                                <PropertyAmities
                                                    icon={<IconPropertyBad />}
                                                    value={`${item.bedrooms} Bedrooms`}
                                                />
                                            ) : null}
                                            {item.guests ? (
                                                <PropertyAmities
                                                    icon={<IconPropertyGuest />}
                                                    value={`${item.guests} Guests`}
                                                />
                                            ) : null}
                                        </div>

                                        <div className="hstack gap-2 flex-wrap">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-grey-200 px-2 fs-12">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {price ? (
                                        <div className="col-lg-5 text-lg-end">
                                            <p className="fs-12 mb-1">
                                                Starting From
                                            </p>
                                            <p className="fs-32 font-tt-drugs mb-1">
                                                {price}
                                            </p>
                                            <p className="fs-12 text-grey-100 mb-0">
                                                Additional Charge May Apply
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default PropertyAccommodation
