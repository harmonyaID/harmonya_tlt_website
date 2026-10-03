import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentIslandGuide,
    SrvContentIslandGuideDetail,
} from '@/service/api/_crm.endPoint'

// Island Guide -> Type
export const getListIslandGuideTypes = (formSearch: object) =>
    _shapeMethodGetSearch(
        SrvContentIslandGuide,
        formSearch,
        'tcSrvContentIslandGuide',
    )

export const getDetailIslandGuideTypes = (slug, urlDirect?: '') =>
    _shapeMethodGet(
        SrvContentIslandGuideDetail(slug),
        'tcSrvContentIslandGuide',
    )
