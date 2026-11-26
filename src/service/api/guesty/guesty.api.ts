import { guestyGet, guestyPost } from '@/service/api/guesty/_guestyConfigAPI'

const API_VERSION = '/v1'

export const getListingGuesty = (params = {}) =>
    guestyGet(API_VERSION + '/listings', params)

export const getDetailListingGuesty = (id) =>
    guestyGet(API_VERSION + '/listings/' + id)

// ex params = {from: 'YYYY-MM-DD', to: 'YYYY-MM-DD'}
export const getCalendarListingGuesty = (id, params) =>
    guestyGet(API_VERSION + '/listings/' + id + '/calendar', params)

// Docs: https://open-api-docs.guesty.com/reference/propertiespaymentprovideridget
// response: { paymentProviderId, paymentProvider: {...} }
export const getPaymentProviderListingGuesty = (id) =>
    guestyGet(API_VERSION + '/listings/' + id, {
        fields: 'paymentProviderId',
    })

// Quote = cek ketersediaan + harga (belum booking), berlaku ±24 jam
// Docs: https://open-api-docs.guesty.com/reference/quotesopenapicontroller_create
// ex formParams = {
//     listingId, checkInDateLocalized: 'YYYY-MM-DD', checkOutDateLocalized: 'YYYY-MM-DD',
//     guestsCount, numberOfGuests: { numberOfAdults }, source: 'website',
// }
export const addQuoteGuesty = (formParams = {}) =>
    guestyPost(API_VERSION + '/quotes', formParams)

export const getQuoteGuesty = (quoteId) =>
    guestyGet(API_VERSION + '/quotes/' + quoteId)

// ======= BOOKING (Open API) =====
// Alur: quote -> guest -> reservation dari quote -> simpan kartu -> charge

// Docs: https://open-api-docs.guesty.com/reference/guestsopenapicontroller_createguest
// ex formParams = { firstName, lastName, email, phone }
export const addGuestGuesty = (formParams = {}) =>
    guestyPost(API_VERSION + '/guests-crud', formParams)

// Docs: https://open-api-docs.guesty.com/reference/reservationsopenapicontroller_createreservation
// ex formParams = { quoteId, ratePlanId, guestId, status: 'confirmed' | 'reserved', reservedUntil }
export const addReservationFromQuoteGuesty = (formParams = {}) =>
    guestyPost(API_VERSION + '/reservations-v3/quote', formParams)

// Simpan kartu & charge -> lihat guestyPayment.api.ts

export const bookingInstantGuesty = (quoteId, formParams = {}) =>
    guestyPost(
        API_VERSION + '/reservations/quotes/' + quoteId + '/instant',
        formParams,
    )

export const bookingInquiryGuesty = (quoteId, formParams = {}) =>
    guestyPost(
        API_VERSION + '/reservations/quotes/' + quoteId + '/inquiry',
        formParams,
    )

export const bookingChargeGuesty = (quoteId, formParams = {}) =>
    guestyPost(
        API_VERSION + '/reservations/quotes/' + quoteId + '/instant-charge',
        formParams,
    )

export const verifyPaymentGuesty = (reservationId, formParams = {}) =>
    guestyPost(
        API_VERSION + '/reservations/' + reservationId + '/verify-payment',
        formParams,
    )

// ======= GUESTY Payment -> lihat guestyPayment.api.ts =====
