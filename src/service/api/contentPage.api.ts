import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentHomePage,
    SrvFaq,
    SrvMenus,
    SrvPartners,
} from '@/service/api/_crm.endPoint'

// Start Global Feature
export const getMenusNavbar = (formSearch = {}, tc: string = 'tcSrvMenus') =>
    _shapeMethodGetSearch(SrvMenus, formSearch, tc)

export const getDetailMenusNavbar = (tc: string = 'tcSrvMenus') =>
    _shapeMethodGet(SrvMenus + '/5', tc)
// End Global Feature

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
