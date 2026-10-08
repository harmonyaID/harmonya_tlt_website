import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentOfferDetail,
    SrvContentOfferPage,
} from '@/service/api/_crm.endPoint'

export const getListOffers = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentOfferPage, formSearch, 'tcGetListOffers')

export const getDetailOffers = (slug: string, tc = 'tcSrvContentOfferDetail') =>
    _shapeMethodGet(SrvContentOfferDetail(slug), tc)
