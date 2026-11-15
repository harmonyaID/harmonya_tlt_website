import { guestyGet, guestyPost } from '@/service/api/guesty/_guestyConfigAPI'

// Guesty Open API — https://open-api-docs.guesty.com/reference
// Base URL: https://open-api.guesty.com/v1
const API_VERSION = '/v1'

// ========== LISTINGS

// ex params = {
//     limit: 25, skip: 0, fields: 'title address', q: 'villa', city: 'Bali',
//     available: { checkIn: 'YYYY-MM-DD', checkOut: 'YYYY-MM-DD', minOccupancy: 2 },
// }
export const getListingGuestyV2 = (params: Record<string, any> = {}) => {
    const { available, ...rest } = params

    return guestyGet(API_VERSION + '/listings', {
        ...rest,
        // Guesty meminta `available` dikirim sebagai JSON string
        ...(available && {
            available:
                typeof available === 'string'
                    ? available
                    : JSON.stringify(available),
        }),
    })
}

// ex params = { fields: 'title address prices' }
export const getDetailListingGuestyV2 = (id: string, params = {}) =>
    guestyGet(API_VERSION + '/listings/' + id, params)

// ex params = { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
export const getCalendarListingGuestyV2 = (
    id: string,
    params: { startDate: string; endDate: string; [key: string]: any },
) =>
    guestyGet(
        API_VERSION + '/availability-pricing/api/calendar/listings/' + id,
        params,
    )

export const getPaymentProviderListingGuestyV2 = (id: string) =>
    guestyGet(API_VERSION + '/listings/' + id, { fields: 'paymentProviderId' })

// ========== QUOTES

// ex formParams = {
//     listingId: '...',
//     checkInDateLocalized: 'YYYY-MM-DD',
//     checkOutDateLocalized: 'YYYY-MM-DD',
//     guestsCount: 2,
//     source: 'website',
//     numberOfGuests: { numberOfAdults: 2, },
//     couponCode: '',
// }
export const addQuoteGuestyV2 = (formParams = {}) =>
    guestyPost(API_VERSION + '/quote', formParams)

export const getQuoteGuestyV2 = (quoteId: string, params = {}) =>
    guestyGet(API_VERSION + '/quotes/' + quoteId, params)

// ========== RESERVATIONS (v3)

// status: 'inquiry' | 'awaiting_payment' | 'reserved' | 'confirmed'
// ex formParams = {
//     quoteId: '...',
//     status: 'confirmed',
//     ratePlanId: '...',
//     guestId: '...', // atau `guest` di bawah
//     guest: { firstName, lastName, email, phones: ['+62...'] },
// }
export const addReservationFromQuoteGuestyV2 = (formParams = {}) =>
    guestyPost(API_VERSION + '/reservations-v3/quote', formParams)

// Booking instant dari quote
export const bookingInstantGuestyV2 = (quoteId: string, formParams = {}) =>
    addReservationFromQuoteGuestyV2({
        ...formParams,
        quoteId,
        status: 'confirmed',
    })

// Booking inquiry dari quote
export const bookingInquiryGuestyV2 = (quoteId: string, formParams = {}) =>
    addReservationFromQuoteGuestyV2({
        ...formParams,
        quoteId,
        status: 'inquiry',
    })

// Reservasi tanpa quote
// ex formParams = { listingId, checkInDateLocalized, checkOutDateLocalized, guestsCount, source, status }
export const addReservationGuestyV2 = (formParams = {}) =>
    guestyPost(API_VERSION + '/reservations-v3', formParams)

// maksimal 10 id
export const getReservationGuestyV2 = (reservationIds: string[], params = {}) =>
    guestyGet(API_VERSION + '/reservations-v3', { ...params, reservationIds })

// ========== GUESTS & PAYMENT METHOD

// ex formParams = { firstName, lastName, email, phone }
export const addGuestGuestyV2 = (formParams = {}) =>
    guestyPost(API_VERSION + '/guests-crud', formParams)

// Stripe: { stripeCardToken: 'pm_...', paymentProviderId, reservationId }
// Guesty Pay: { _id: '<token id>', paymentProviderId, reservationId }
export const addPaymentMethodGuestyV2 = (guestId: string, formParams = {}) =>
    guestyPost(
        API_VERSION + '/guests/' + guestId + '/payment-methods',
        formParams,
    )

// ========== PAYMENTS

// ex formParams = { reservationId, paymentMethodId, amount, note }
export const addPaymentGuestyV2 = (formParams = {}) =>
    guestyPost(API_VERSION + '/payments', formParams)

export const getPaymentReservationGuestyV2 = (reservationId: string) =>
    guestyGet(API_VERSION + '/payments', { reservationId })
