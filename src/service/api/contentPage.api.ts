import { _shapeMethodGetSearch } from '@/service/api/@config/configAPIPublic'
import {
    SrvContentHomePage,
    SrvFaq,
    SrvPartners,
} from '@/service/api/_crm.endPoint'

export const getContentHomePage = (formSearch = {}) =>
    _shapeMethodGetSearch(
        SrvContentHomePage,
        formSearch,
        'tcSrvContentHomePage',
    )

export const getMediaPartner = (formSearch = {}) =>
    _shapeMethodGetSearch(SrvPartners, formSearch, 'tcSrvContentHomePage')

export const getFAQHomePage = (
    formSearch = {},
    tc: string = 'tcSrvFaqHomaPage',
) =>
    _shapeMethodGetSearch(
        SrvFaq,
        // formSearch,
        {
            // ...formSearch,
            // typeId: 1,
            page: 1,
            limit: 10,
        },
        tc,
    )
