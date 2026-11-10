import { guestyGet, guestyPost } from '@/service/api/guesty/_guestyConfigAPI'

export const getListingGuesty = (params = {}) => guestyGet('/listings', params)

export const getDetailListingGuesty = (id) => guestyGet('/listings/' + id)

// ex params = {from: 'YYYY-MM-DD', to: 'YYYY-MM-DD'}
export const getCalendarListingGuesty = (id, params) =>
    guestyGet('/listings/' + id + '/calendar', params)

export const getPaymentProviderListingGuesty = (id) =>
    guestyGet('/listings/' + id + '/payment-provider')

export const addQuoteGuesty = (formParams = {}) =>
    guestyPost('/reservations/quotes', formParams)

export const getQuoteGuesty = (quoteId) =>
    guestyGet('/reservations/quotes/' + quoteId)

export const bookingInstantGuesty = (quoteId, formParams = {}) =>
    guestyPost('/reservations/quotes/' + quoteId + '/instant', formParams)

export const bookingInquiryGuesty = (quoteId, formParams = {}) =>
    guestyPost('/reservations/quotes/' + quoteId + '/inquiry', formParams)

export const bookingChargeGuesty = (quoteId, formParams = {}) =>
    guestyPost(
        '/reservations/quotes/' + quoteId + '/instant-charge',
        formParams,
    )

export const verifyPaymentGuesty = (reservationId, formParams = {}) =>
    guestyPost('/reservations/' + reservationId + '/verify-payment', formParams)
