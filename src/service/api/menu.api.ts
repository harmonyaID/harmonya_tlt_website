import { _shapeMethodGet } from '@/service/api/@config/configAPIPublic'
import { SrvMenuNavigation } from '@/service/api/_crm.endPoint'

export const getMenuNavigation = (tc = 'tcSrvMenuNavigation') =>
    _shapeMethodGet(SrvMenuNavigation, tc)
