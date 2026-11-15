import { guestyGet, guestyPost } from '@/service/api/guesty/_guestyConfigAPI'

const API_VERSION = '/v1'

export const getListingGuesty = (params = {}) =>
    guestyGet(API_VERSION + '/listings', params)

export const getDetailListingGuesty = (id) =>
    guestyGet(API_VERSION + '/listings/' + id)

// ex params = {from: 'YYYY-MM-DD', to: 'YYYY-MM-DD'}
export const getCalendarListingGuesty = (id, params) =>
    guestyGet(API_VERSION + '/listings/' + id + '/calendar', params)

export const getPaymentProviderListingGuesty = (id) =>
    guestyGet(API_VERSION + '/listings/' + id + '/payment-provider')

export const addQuoteGuesty = (formParams = {}) =>
    guestyPost(API_VERSION + '/reservations-v3/quote', formParams)

export const getQuoteGuesty = (quoteId) =>
    guestyGet(API_VERSION + '/reservations/quotes/' + quoteId)

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
