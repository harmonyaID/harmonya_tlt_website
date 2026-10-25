import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentPropertyVariant,
    SrvContentPropertyVariantDetail,
    SrvPropertyType,
} from '@/service/api/_crm.endPoint'

export const getPropertyHomePage = () =>
    _shapeMethodGetSearch(
        SrvContentPropertyVariant,
        {
            page: 1,
            limit: 10,
            isPublished: true,
        },
        'tcSrvContentPropertyVariantHomePage',
    )

export const getCategoryPropertyVariant = () => {}

export const getPropertyVariantList = (formSearch: object) =>
    _shapeMethodGetSearch(
        SrvContentPropertyVariant,
        formSearch,
        'tcGetPropertyVariantList',
    )

export const getPropertyVariantDetail = async (
    slug,
    tc = 'SrvContentPropertyVariantDetail',
) => await _shapeMethodGet(SrvContentPropertyVariantDetail(slug), tc)

export const getPropertyVariantType = async () =>
    await _shapeMethodGetSearch(
        SrvPropertyType,
        { limit: 0 },
        'tcGetPropertyVariantType',
    )
