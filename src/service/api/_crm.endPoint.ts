const baseApi = process.env.NEXT_PUBLIC_CRM_BASE_API

export const SrvContentHomePage = baseApi + '/homepages'

// Page
export const SrvContentPage = baseApi + '/pages'
export const SrvContentPageDetail = (slug: string) =>
    baseApi + '/pages' + '/' + slug

// Blog
export const SrvContentBlog = baseApi + '/blogs'

export const SrvContentBlogDetail = (slug?: string) =>
    SrvContentBlog + '/' + slug

export const SrvContentBlogCategory = baseApi + '/blog-categories'

export const SrvContentBlogTag = baseApi + '/blog-tags'

// Menus
export const SrvMenus = baseApi + '/menus'

// Partner
export const SrvPartners = baseApi + '/media-partners'

// FAS
export const SrvFaq = baseApi + '/faqs'

// Property
export const SrvContentPropertyHomePage = baseApi + '/properties'

// Offers
export const SrvContentOfferPage = baseApi + '/offers'

export const SrvContentOfferDetail = (slug: string) =>
    SrvContentOfferPage + '/' + slug

// Experience
export const SrvContentExp = baseApi + '/experiences'

export const SrvContentExpDetail = (slug: string) => SrvContentExp + '/' + slug

// Experience -> Type
export const SrvContentExpType = baseApi + '/experience-types'

export const SrvContentExpTypeDetail = (slug: string) =>
    SrvContentExpType + '/' + slug
