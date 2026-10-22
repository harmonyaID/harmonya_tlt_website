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

export const getBoatList = (formSearch: any) =>
    _shapeMethodGetSearch(
        SrvBoat,
        formSearch,
        'tcSrvBoat_' + formSearch?.typeId || '',
    )

export const getBoatDetail = (id?: any, tc = 'tcSrvBoatDetail') =>
    _shapeMethodGet(SrvBoatDetail(id), tc)

export const createBoatContactForm = (formRequest: object) =>
    _shapeMethodPost(SrvBoatContactForm, formRequest)
