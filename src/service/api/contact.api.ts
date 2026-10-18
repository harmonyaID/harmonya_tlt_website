import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPost,
} from '@/service/api/@config/configAPIPublic'
import { SrvContactForm } from '@/service/api/_crm.endPoint'

export const addFormContact = (formRequest: any) =>
    _shapeMethodPost(SrvContactForm, formRequest)
