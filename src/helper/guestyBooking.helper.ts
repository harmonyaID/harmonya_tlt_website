// Helper booking Guesty: ambil harga dari quote + simpan pilihan booking
// antar halaman (detail property -> payment).

export const BOOKING_STORAGE_KEY = 'tlt_guesty_booking'

export interface GuestyBooking {
    quoteId: string
    ratePlanId: string
    expiresAt?: string
    listingId: string
    propertyName: string
    checkIn: string // YYYY-MM-DD
    checkOut: string // YYYY-MM-DD
    guests: number
    nights: number
    currency: string
    accommodation: number
    fees: number
    taxes: number
    total: number
}

const num = (v: any) => Number(v) || 0

// Ambil rate plan pertama yang available dari response POST /quotes
export const parseQuote = (
    quote: any,
    extra: {
        listingId: string
        propertyName: string
        guests: number
    },
): GuestyBooking | null => {
    const plans: any[] = quote?.rates?.ratePlans || []
    const plan = plans.find((p) => !p?.notApplicable) || null
    const money = plan?.money?.money

    if (!quote?._id || !plan || !money) return null

    const checkIn = quote.checkInDateLocalized
    const checkOut = quote.checkOutDateLocalized
    const nights = Math.max(
        1,
        Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                86400000,
        ),
    )

    // Total ke tamu = subtotal (akomodasi + fee) + pajak
    const subTotal = num(money.subTotalPrice)
    const taxes = num(money.totalTaxes)

    return {
        quoteId: quote._id,
        ratePlanId: plan.ratePlan?._id || plan.money?.rateId || '',
        expiresAt: quote.expiresAt,
        listingId: extra.listingId,
        propertyName: extra.propertyName,
        checkIn,
        checkOut,
        guests: extra.guests,
        nights,
        currency: money.currency || 'USD',
        accommodation: num(money.fareAccommodation),
        fees: num(money.totalFees),
        taxes,
        total: subTotal + taxes,
    }
}

export const formatMoney = (value: number, currency = 'USD') => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
        }).format(value)
    } catch {
        return `${currency} ${value.toFixed(2)}`
    }
}

export const saveBooking = (booking: GuestyBooking) => {
    try {
        sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking))
    } catch {}
}

export const loadBooking = (): GuestyBooking | null => {
    try {
        const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export const clearBooking = () => {
    try {
        sessionStorage.removeItem(BOOKING_STORAGE_KEY)
    } catch {}
}
