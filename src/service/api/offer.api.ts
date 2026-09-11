import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentOfferDetail,
    SrvContentOfferPage,
    SrvContentPropertyHomePage,
} from '@/service/api/_crm.endPoint'

export const getListOffers = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentOfferPage, formSearch, 'tcGetListOffers')

export const getDetailOffers = (slug: string) =>
    _shapeMethodGet(SrvContentOfferDetail(slug), 'tcSrvContentOfferDetail')
