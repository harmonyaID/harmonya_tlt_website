import { _shapeMethodGetSearch } from '@/service/api/@config/configAPIPublic'
import {
    SrvContentHomePage,
    SrvFaq,
    SrvPartners,
} from '@/service/api/_crm.endPoint'

export const getContentHomePage = async (formSearch = {}) =>
    await _shapeMethodGetSearch(
        SrvContentHomePage,
        formSearch,
        'tcSrvContentHomePage',
    )

export const getMediaPartner = async (formSearch = {}) =>
    await _shapeMethodGetSearch(SrvPartners, formSearch, 'tcSrvContentHomePage')

export const getFAQHomePage = async (
    formSearch = {},
    tc: string = 'tcSrvFaqHomaPage',
) =>
    await _shapeMethodGetSearch(
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
