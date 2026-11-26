type FormatAUDOptions = {
    withSymbol?: boolean // 'A$6,750.00' vs '6,750.00'
    withCode?: boolean // '6,750.00 AUD'
    decimals?: number // fraction digits, default 2
    compact?: boolean // 'A$6.8K'
}

const AUD_LOCALE = 'en-AU'
const AUD_CURRENCY = 'AUD'

// Ex: '6,750.00', 6750, null -> 6750 | 0
export const parseAUD = (value: string | number | null | undefined): number => {
    if (value === null || value === undefined || value === '') return 0
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0

    const parsed = Number(String(value).replace(/[^0-9.-]/g, ''))

    return Number.isFinite(parsed) ? parsed : 0
}

// Ex: 6750 -> 'A$6,750.00' | 'AUD 6,750.00' style variants via options
export const formatAUD = (
    value: string | number | null | undefined,
    options: FormatAUDOptions = {},
): string => {
    const {
        withSymbol = true,
        withCode = false,
        decimals = 2,
        compact = false,
    } = options

    const amount = parseAUD(value)

    const formatted = new Intl.NumberFormat(AUD_LOCALE, {
        style: withSymbol ? 'currency' : 'decimal',
        currency: AUD_CURRENCY,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: compact ? 0 : decimals,
        maximumFractionDigits: compact ? 1 : decimals,
        notation: compact ? 'compact' : 'standard',
    }).format(amount)

    // en-AU narrowSymbol renders '$'; prefix with 'A' to disambiguate from USD
    const withPrefix = withSymbol ? formatted.replace('$', 'A$') : formatted

    return withCode ? `${withPrefix} ${AUD_CURRENCY}` : withPrefix
}

// Ex: 6750 -> '$6,750' (whole dollars, local AU display)
export const formatAUDShort = (value: string | number | null | undefined): string =>
    new Intl.NumberFormat(AUD_LOCALE, {
        style: 'currency',
        currency: AUD_CURRENCY,
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
    }).format(parseAUD(value))

// Ex: 6750.5 -> 675050 (cents, for payment APIs)
export const toAUDCents = (value: string | number | null | undefined): number =>
    Math.round(parseAUD(value) * 100)

// Ex: 675050 -> 6750.5
export const fromAUDCents = (cents: number): number => cents / 100
