import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import { SrvContentPropertyHomePage } from '@/service/api/_crm.endPoint'

export const getPropertyHomePage = () =>
    _shapeMethodGet(SrvContentPropertyHomePage)
