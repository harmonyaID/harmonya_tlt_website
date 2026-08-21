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

export const getBlogList = async (formSearch: object) =>
    await _shapeMethodGetSearch(SrvContentBlog, formSearch, 'tcSrvContentBlog')

export const getBlogDetail = async (
    slug: string | number,
    tc = 'tcSrvContentBlogDetail',
) => await _shapeMethodGet(SrvContentBlogDetail(slug), tc)

export const getBlogCategoryList = async () =>
    await _shapeMethodGet(SrvContentBlogCategory, 'tcSrvContentBlogCategory')

export const getBlogTagList = async () =>
    await _shapeMethodGet(SrvContentBlogTag, 'tcSrvContentBlogTag')
