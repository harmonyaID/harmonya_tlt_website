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

// Lokasi object money berbeda antara guide & schema Guesty, jadi cek semua:
// - guide Open API : ratePlans[].money.money
// - schema         : ratePlans[].money / ratePlans[].ratePlan.money
const getPlanMoney = (plan: any) =>
    plan?.money?.money ||
    plan?.ratePlan?.money?.money ||
    (plan?.money?.fareAccommodation !== undefined ? plan.money : null) ||
    (plan?.ratePlan?.money?.fareAccommodation !== undefined
        ? plan.ratePlan.money
        : null)

const countNights = (checkIn: string, checkOut: string) => {
    const diff =
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
    return Number.isFinite(diff) ? Math.max(1, Math.round(diff)) : 1
}

// Ambil rate plan pertama yang available dari response POST/GET /quotes
export const parseQuote = (
    quote: any,
    extra: {
        listingId: string
        propertyName: string
        guests: number
        checkIn?: string
        checkOut?: string
    },
): GuestyBooking | null => {
    const plans: any[] = quote?.rates?.ratePlans || []
    const plan = plans.find((p) => !p?.notApplicable) || null
    const money = getPlanMoney(plan)

    if (!quote?._id || !plan || !money) return null

    const stay = quote?.stay?.[0] || {}
    const checkIn =
        quote.checkInDateLocalized ||
        stay.checkInDateLocalized ||
        extra.checkIn ||
        ''
    const checkOut =
        quote.checkOutDateLocalized ||
        stay.checkOutDateLocalized ||
        extra.checkOut ||
        ''

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
        nights: countNights(checkIn, checkOut),
        currency: money.currency || 'USD',
        accommodation: num(money.fareAccommodation),
        fees: num(money.totalFees),
        taxes,
        total: subTotal + taxes,
    }
}

export const isQuoteExpired = (booking: { expiresAt?: string } | null) =>
    !!booking?.expiresAt && new Date(booking.expiresAt).getTime() <= Date.now()

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

// ===== Hasil booking (dipakai halaman success) =====
export const BOOKING_RESULT_STORAGE_KEY = 'tlt_guesty_booking_result'

export interface GuestyBookingResult {
    status: 'paid' | 'reserved' | 'processing' | 'pending_auth'
    reservationId: string
    confirmationCode?: string
    propertyName?: string
    checkIn?: string
    checkOut?: string
    total?: number
    currency?: string
}

export const saveBookingResult = (result: GuestyBookingResult) => {
    try {
        sessionStorage.setItem(
            BOOKING_RESULT_STORAGE_KEY,
            JSON.stringify(result),
        )
    } catch {}
}

export const loadBookingResult = (): GuestyBookingResult | null => {
    try {
        const raw = sessionStorage.getItem(BOOKING_RESULT_STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}
