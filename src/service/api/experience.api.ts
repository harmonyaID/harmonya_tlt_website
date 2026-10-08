import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentExp,
    SrvContentExpArea,
    SrvContentExpAreaDetail,
    SrvContentExpDetail,
    SrvContentExpType,
    SrvContentExpTypeDetail,
} from '@/service/api/_crm.endPoint'

export const getListExperiences = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentExp, formSearch, 'tcSrvContentExp')

export const getDetailExperience = async (slug: string) =>
    await _shapeMethodGet(SrvContentExpDetail(slug), 'tcSrvContentExpDetail')

// Type
export const getListExpTypes = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentExpType, formSearch, 'tcSrvContentExpType')

export const getDetailExpTypes = async (
    slug?: string,
    tc = 'tcSrvContentExpTypeDetail',
) => await _shapeMethodGet(SrvContentExpTypeDetail(slug), tc)

// Area
export const getListExpArea = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentExpArea, formSearch, 'tcSrvContentExpArea')

export const getDetailExpArea = async (
    slug?: string,
    tc = 'tcSrvContentExpAreaDetail',
) => await _shapeMethodGet(SrvContentExpAreaDetail(slug), tc)
