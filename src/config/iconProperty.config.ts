import ICON_LABEL_BEST_PRICES from '@/asset/image/iconProperty/icon-label-best-price.svg'
import ICON_LABEL_BEST_NEW_RESORT from '@/asset/image/iconProperty/icon-label-best-new-resort.svg'
import ICON_FEATURE_BED from '@/asset/image/icon/icon-property-bad.svg'
import ICON_FEATURE_EAT from '@/asset/image/icon/icon-property-eat.svg'
import ICON_FEATURE_POOL from '@/asset/image/icon/icon-property-pool.svg'
import ICON_FEATURE_PROFILE from '@/asset/image/icon/icon-property-profile.svg'

// key = field `icon` dari API features
export const ICON_FEATURE_MAP: Record<string, any> = {
    bed: ICON_FEATURE_BED,
    bedroom: ICON_FEATURE_BED,
    eat: ICON_FEATURE_EAT,
    dining: ICON_FEATURE_EAT,
    pool: ICON_FEATURE_POOL,
    profile: ICON_FEATURE_PROFILE,
    guest: ICON_FEATURE_PROFILE,
}

export { ICON_LABEL_BEST_PRICES, ICON_LABEL_BEST_NEW_RESORT }
