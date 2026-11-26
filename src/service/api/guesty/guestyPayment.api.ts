// API Guesty Payment (GuestyPay via Open API)
// Alur: tokenisasi kartu (SDK pay.guesty.com) -> simpan payment method -> charge
import {
    guestyPaymentGet,
    guestyPaymentPost,
} from '@/service/api/guesty/_guestyPaymentConfigAPI'

// ========== PAYMENT METHOD

// Simpan kartu hasil tokenization SDK ke guest
// Docs: https://open-api-docs.guesty.com/reference/paymentspaymentmethodcreate
// ex formParams = {
//     guestId: '...',
//     paymentProviderId: '...',
//     confirmationCode: '...', // kode konfirmasi reservasi
//     _id: '<id dari guestyTokenization.submit()>',
//     reuse: false,
// }
// response: { _id, status: 'ACTIVE' | 'INVALID' | ..., last4, brand, ... }
export const guestyPaymentCreatePaymentMethod = (formParams = {}) =>
    guestyPaymentPost('/payment-methods', formParams)

// ex params = { guestId } atau { reservationId } (pilih salah satu)
export const guestyPaymentGetPaymentMethod = (params: {
    guestId?: string
    reservationId?: string
}) => guestyPaymentGet('/payment-methods', params as any)

// ========== PAYMENT RESERVATION

// Buat payment untuk reservasi. Tanpa shouldBePaidAt = langsung di-charge.
// Docs: https://open-api-docs.guesty.com/reference/paymentsreservationcreate
// ex formParams = { reservationId, paymentMethodId, amount, note }
// response: {
//     _id, status: 'SUCCEEDED' | 'FAILED' | 'PENDING' | 'PENDING_AUTH' | 'PROCESSING' | ...,
//     amount, currency, error, authenticationRequiredData: { authenticationUrl },
// }
export const guestyPaymentAddToReservations = (formParams = {}) =>
    guestyPaymentPost('/payments', formParams)

// Charge ulang payment berstatus PENDING / FAILED (tanpa body)
// Docs: https://open-api-docs.guesty.com/reference/paymentsreservationcharge
export const guestyPaymentChargePayment = (paymentId: string) =>
    guestyPaymentPost('/payments/' + paymentId + '/pay')
