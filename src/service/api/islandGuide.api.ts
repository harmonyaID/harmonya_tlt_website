import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentIslandGuide,
    SrvContentIslandGuideDetail,
    SrvContentIslandGuideType,
    SrvContentIslandGuideTypeDetail,
} from '@/service/api/_crm.endPoint'

// Island Guide
export const getListIslandGuide = (formSearch: object) =>
    _shapeMethodGetSearch(
        SrvContentIslandGuide,
        formSearch,
        'tcSrvContentIslandGuide',
    )

export const getDetailIslandGuide = (
    slug: string,
    tc = 'tcSrvContentIslandGuideDetail',
) => _shapeMethodGet(SrvContentIslandGuideDetail(slug), tc)

// Island Guide -> Type
export const getListIslandGuideTypes = (formSearch: object) =>
    _shapeMethodGetSearch(
        SrvContentIslandGuideType,
        formSearch,
        'tcSrvContentIslandGuideType',
    )

export const getDetailIslandGuideTypes = (
    slug: string,
    tc = 'tcSrvContentIslandGuideTypeDetail',
) => _shapeMethodGet(SrvContentIslandGuideTypeDetail(slug), tc)
