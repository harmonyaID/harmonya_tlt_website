import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPost,
} from '@/service/api/@config/configAPIPublic'
import { SrvContactForm, SrvContactType } from '@/service/api/_crm.endPoint'

export const addFormContact = (formRequest: any) =>
    _shapeMethodPost(SrvContactForm, formRequest)

export const listTypeContact = () =>
    _shapeMethodGet(SrvContactType, 'tcSrvContactType')
