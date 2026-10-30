import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPost,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvBoat,
    SrvBoatContactForm,
    SrvBoatDetail,
    SrvContentBlog,
    SrvContentBlogDetail,
} from '@/service/api/_crm.endPoint'

export const getBoatList = (formSearch: any, tc: string = 'tcBoatList') =>
    _shapeMethodGetSearch(SrvBoat, formSearch, tc)

export const getBoatDetail = (id?: any, tc = 'tcSrvBoatDetail') =>
    _shapeMethodGet(SrvBoatDetail(id), tc)

export const createBoatContactForm = (formRequest: object) =>
    _shapeMethodPost(SrvBoatContactForm, formRequest)
