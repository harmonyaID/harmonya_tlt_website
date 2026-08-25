import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import { SrvContentHomePage, SrvFaq } from '@/service/api/_crm.endPoint'

export const getContentHomePage = async (formSearch = {}) =>
    await _shapeMethodGetSearch(
        SrvContentHomePage,
        formSearch,
        'SrvContentHomePage',
    )

export const getMediaPartner = () => {}

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
