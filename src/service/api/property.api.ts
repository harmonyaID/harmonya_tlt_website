import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentPropertyDetail,
    SrvContentPropertyHomePage,
    SrvPropertyType,
} from '@/service/api/_crm.endPoint'

export const getPropertyHomePage = () =>
    _shapeMethodGetSearch(
        SrvContentPropertyHomePage,
        {
            page: 1,
            limit: 10,
            isPublished: true,
        },
        'tcSrvContentPropertyHomePage',
    )

export const getCategoryProperty = () => {}

export const getPropertyList = (formSearch: object) =>
    _shapeMethodGetSearch(
        SrvContentPropertyHomePage,
        formSearch,
        'tcGetPropertyList',
    )

export const getPropertyDetail = async (
    slug,
    tc = 'SrvContentPropertyDetail',
) => await _shapeMethodGet(SrvContentPropertyDetail(slug), tc)

export const getPropertyType = async () =>
    await _shapeMethodGetSearch(
        SrvPropertyType,
        { limit: 0 },
        'tcGetPropertyType',
    )
