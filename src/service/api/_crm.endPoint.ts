const baseApi = process.env.NEXT_PUBLIC_CRM_BASE_API

export const SrvContentHomePage = baseApi + '/homepages'

// Blog
export const SrvContentBlog = baseApi + '/blogs'

export const SrvContentBlogDetail = (slug: string | number) =>
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
