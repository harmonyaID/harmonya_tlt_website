// Config API Guesty Payment
// Endpoint payment GuestyPay yang terdokumentasi resmi ada di Open API Guesty
// (https://pay.guesty.com/api tidak terdokumentasi & membalas 404).
// Docs: https://open-api-docs.guesty.com/docs/tokenizing-payment-methods
// Token sama dengan Open API Guesty (diambil & di-cache oleh _guestyConfigAPI)
import axios from 'axios'
import { clearCookie, getToken } from '@/service/api/guesty/_guestyConfigAPI'

const BASE_URL_GUESTY_PAYMENT = 'https://open-api.guesty.com/v1'

const guestyPaymentApi = axios.create({ baseURL: BASE_URL_GUESTY_PAYMENT })

// token otomatis dipasang di setiap request
guestyPaymentApi.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`
    return config
})

// token ditolak -> hapus cookie agar request berikutnya ambil token baru
guestyPaymentApi.interceptors.response.use(undefined, (error) => {
    if (error?.response?.status === 401) clearCookie()
    return Promise.reject(error)
})

export const guestyPaymentGet = (endpoint: string, params = null) =>
    guestyPaymentApi.get(endpoint, params ? { params } : {})

export const guestyPaymentPost = (endpoint: string, body = {}) =>
    guestyPaymentApi.post(endpoint, body)
