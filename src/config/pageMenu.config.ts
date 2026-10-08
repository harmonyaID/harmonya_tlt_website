import { ABOUT_PATH, ABOUT_US_PATH } from '@/config/pagePath.config'

export const ABOUT_MENU = 'ABOUT'
export const ABOUT_US_MENU = 'ABOUT US'
export const STAY_MENU = 'STAY'
export const BOAT_TRANSFERS_MENU = 'BOAT TRANSFERS'
export const EXPERIENCE_MENU = 'EXPERIENCE'
export const ISLAND_GUIDE_MENU = 'ISLAND GUIDE'
export const PRESS_AND_MEDIA_MENU = 'PRESS & MEDIA'
export const CONTACT_MENU = 'CONTACT'
export const CONTACT_US_MENU = 'CONTACT US'
export const BLOG_MENU = 'BLOG'
export const FAQ_MENU = 'FAQ'
export const TERMS_AND_CONDITION_MENU = 'TERMS & CONDITION'
export const PRIVACY_POLICY_MENU = 'PRIVACY POLICY'

// Combination MENU + ULR/LINK
const shapeMenu = (name: string, href: any = '#') => ({
    name,
    href,
})

export const aboutMenu = shapeMenu(ABOUT_MENU, ABOUT_PATH)
export const aboutUsMenu = shapeMenu(ABOUT_US_MENU, ABOUT_US_PATH)
