import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
} from '@/service/api/@config/configAPIPublic'
import {
    SrvContentBlog,
    SrvContentBlogDetail,
    SrvContentBlogCategory,
    SrvContentBlogTag,
} from '@/service/api/_crm.endPoint'

export const getBlogList = (formSearch: object) =>
    _shapeMethodGetSearch(SrvContentBlog, formSearch, 'tcSrvContentBlog')

export const getBlogDetail = (
    slug: string | number,
    tc = 'tcSrvContentBlogDetail',
) => _shapeMethodGet(SrvContentBlogDetail(slug), tc)

export const getBlogCategoryList = () =>
    _shapeMethodGet(SrvContentBlogCategory, 'tcSrvContentBlogCategory')

export const getBlogTagList = () =>
    _shapeMethodGet(SrvContentBlogTag, 'tcSrvContentBlogTag')
