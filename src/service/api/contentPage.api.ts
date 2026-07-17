import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import { SrvContentHomePage } from '@/service/api/_crm.endPoint'

export const getContentHomePage = async (formSearch = {}) =>
    await _shapeMethodGetSearch(
        SrvContentHomePage,
        formSearch,
        'SrvContentHomePage',
    )
