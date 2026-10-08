import ImageEmptyBox from '@/asset/image/default/image-empty-1-1.svg'
import ImageEmptyReel from '@/asset/image/default/image-empty-9-16.svg'
import ImageEmptyLandscape from '@/asset/image/default/image-empty-16-9.svg'

export const imgBoxConfig = (src: string | any = '') => src || ImageEmptyBox

export const imgReelConfig = (src: string | any = '') => src || ImageEmptyReel

export const imgLandscapeConfig = (src: string | any = '') =>
    src || ImageEmptyLandscape
