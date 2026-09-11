import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentExp,
    SrvContentExpDetail,
    SrvContentExpType,
    SrvContentExpTypeDetail,
} from '@/service/api/_crm.endPoint'

export const getListExperiences = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentExp, formSearch, 'tcSrvContentExp')

export const getDetailExperience = (slug: string) =>
    _shapeMethodGet(SrvContentExpDetail(slug), 'tcSrvContentExpDetail')

// Type
export const getListExpTypes = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentExpType, formSearch, 'tcSrvContentExpType')

export const getDetailExpTypes = (slug: string) =>
    _shapeMethodGet(SrvContentExpTypeDetail(slug), 'tcSrvContentExpTypeDetail')
