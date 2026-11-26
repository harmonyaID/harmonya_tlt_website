// =====================================================================
// GUESTY V2 SERVER API
// Quote, guest, reservation & payment -> guestyDirect (Bearer Token dinamis,
// lewat rewrite /guesty-open-api di next.config.ts -> tidak kena CORS).
// Docs: https://open-api-docs.guesty.com/reference
// =====================================================================
import {
    guestyDirectGet,
    guestyDirectPost,
    guestyServerV2Get,
} from '@/service/api/guesty/server/_guestyServerV2ConfigAPI'

const API_VERSION = '/v1'

// ========== LISTINGS
export const getListingGuestyServerV2 = (params: Record<string, any> = {}) =>
    guestyServerV2Get(API_VERSION + '/listings', params)

export const getDetailListingGuestyServerV2 = (id: string, params = {}) =>
    guestyServerV2Get(API_VERSION + '/listings/' + id, params)

// ex params = { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
export const getCalendarListingGuestyServerV2 = (
    id: string,
    params: { startDate: string; endDate: string; [key: string]: any },
) =>
    guestyServerV2Get(
        API_VERSION + '/availability-pricing/api/calendar/listings/' + id,
        params,
    )

// paymentProviderId listing (untuk GuestyPay SDK)
// Guesty mengembalikan `paymentProvider._id` -> disalin ke `paymentProviderId`
export const getPaymentProviderListingGuestyServerV2 = async (id: string) => {
    const res = await guestyDirectGet(API_VERSION + '/listings/' + id, {
        fields: 'paymentProviderId paymentProvider',
    })
    const data = res?.data || {}
    data.paymentProviderId =
        data.paymentProviderId || data.paymentProvider?._id || ''
    return { ...res, data }
}

// ========== QUOTES
// body = { listingId, checkInDateLocalized, checkOutDateLocalized,
//          guestsCount, source: 'Website', couponCode: '' }
// Create quote: langsung ke Guesty Open API (Bearer Token dinamis)
export const addQuoteGuestyServerV2 = (formParams = {}) =>
    guestyDirectPost(API_VERSION + '/quotes', {
        ...formParams,
        source: 'Website',
    })

export const getQuoteGuestyServerV2 = (quoteId: string) =>
    guestyDirectGet(API_VERSION + '/quotes/' + quoteId)

// ========== GUEST & RESERVATION
export const addGuestGuestyServerV2 = (formParams = {}) =>
    guestyDirectPost(API_VERSION + '/guests-crud', formParams)

export const addReservationFromQuoteGuestyServerV2 = (formParams = {}) =>
    guestyDirectPost(API_VERSION + '/reservations-v3/quote', formParams)

// ========== PAYMENT
// body = { guestId, paymentProviderId, confirmationCode, _id (token SDK), reuse }
export const guestyPaymentCreatePaymentMethodServerV2 = (formParams = {}) =>
    guestyDirectPost(API_VERSION + '/payment-methods', formParams)

// body = { reservationId, paymentMethodId, amount, note }
export const guestyPaymentAddToReservationsServerV2 = (formParams = {}) =>
    guestyDirectPost(API_VERSION + '/payments', formParams)

export const guestyPaymentChargePaymentServerV2 = (paymentId: string) =>
    guestyDirectPost(API_VERSION + '/payments/' + paymentId + '/pay')
