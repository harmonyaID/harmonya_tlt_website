// import axios from 'axios'
//
// const BASE_API_CRM = process.env.NEXT_PUBLIC_CRM_BASE_API
//
// // const BASE_URL = 'https://booking.guesty.com'
// const BASE_URL = 'https://open-api.guesty.com'
// let cache = { token: null, exp: 0 }
//
// const getToken = async () => {
//     if (cache.token && Date.now() < cache.exp) return cache.token
//
//     const { accessToken } = await axios
//         .get(`${BASE_API_CRM}/api/public/guesty/token`)
//         .then((res) => res?.data?.result || {})
//
//     const data = { expires_in: 3000 }
//
//     cache = {
//         token: accessToken,
//         // token: 'eyJraWQiOiJ6Uk50b3FxLVU2eTlqZ21VdFRHZ21HOE9rZG1vcW9ldnNsZzliWldhQ29nIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnIyQVFJWnZDRkdUcmRIRkZvQWY0U1VmYkxsRUZjblFIQnBQaElnNWNLSEUiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNzk0NTM0NTQyLCJleHAiOjE3OTQ2MjA5NDIsImNpZCI6IjBvYXh5OXk1YmZQNm1CTWh1NWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNmFlN2ZiYjg4ODZlMjM4ZjY2YjE2NjFlIiwic3ViIjoiMG9heHk5eTViZlA2bUJNaHU1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJvcGVuYXBpIiwiaWFtIjoidjMiLCJhY2NvdW50TmFtZSI6IlRoZSBMZW1ib25nYW4gVHJhdmVsbGVyIiwibmFtZSI6InNhbmRib3ggZ3Vlc3R5In0.NXaIlm0gYb6fUaSffq2DcPsIUTZLjz57838xAc64lXTY2xffgteaFvvMozGEPrO6zfaKJwvMNBeSJbuX5YTLqcld1t3KarR-kKztW88O20QEcYFsEYyzRRHisijUfjMY3bT1ihelM_leEuPh-ONRtACTItpwHePMxshodBc1bq_5OCURHNozr1tAqd2VM6svznbu11G-u8bUWhCfi36gr4pKIdGh0AZ-e530o2FzmgEN7ptW4ey3fHNXBj_8vpNdbIfiLfgJYmuK4RyQT25y9stmdmNk364bZ-nLfJ0QipqG_ebP8Am4FhoEukRq22uRrGdm1UVRtKTmZHRLAspzxA',
//         exp: Date.now() + (data?.expires_in - 300) * 1000,
//     }
//     return cache.token
// }
//
// const guestyApi = axios.create({ baseURL: `${BASE_URL}/api` })
//
// // token otomatis dipasang di setiap request
// guestyApi.interceptors.request.use(async (config) => {
//     config.headers.Authorization = `Bearer ${await getToken()}`
//     return config
// })
//
// export const guestyGet = (endpoint, params = null) =>
//     guestyApi.get(endpoint, params ? { params } : {})
//
// export const guestyPost = (endpoint, body) => guestyApi.post(endpoint, body)

// V3 — token disimpan di cookie (key: COOKIE_TOKEN_GUESTY), fetch hanya saat expired
import axios from 'axios'
import { COOKIE_TOKEN_GUESTY } from '@/config/cacheClient.config'

const BASE_API_CRM = process.env.NEXT_PUBLIC_CRM_BASE_API
const BASE_URL = 'https://open-api.guesty.com'
const REFRESH_BUFFER_MS = 5 * 60 * 1000 // anggap expired 5 menit sebelum habis

// Token yang sudah terlanjur diambil, dipakai sebagai seed cookie awal
const INITIAL_TOKEN =
    'eyJraWQiOiJ6Uk50b3FxLVU2eTlqZ21VdFRHZ21HOE9rZG1vcW9ldnNsZzliWldhQ29nIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlRZbHdQS2VYdHM0d1ZSN2tZQUtLRV9TS1hGRDlWdmFmZF9uUG9pVER6MlEiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNzk1MDIyMzk3LCJleHAiOjE3OTUxMDg3OTcsImNpZCI6IjBvYXVteW16bzZzbnRiUnJpNWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNjhkNjM4ZDVlYTE4OTVkOTAwNWVhNDFlIiwic3ViIjoiMG9hdW15bXpvNnNudGJScmk1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJvcGVuYXBpIiwiaWFtIjoidjMiLCJhY2NvdW50TmFtZSI6IlRoZSBMZW1ib25nYW4gVHJhdmVsbGVyIiwibmFtZSI6IlRMVCBBUEkifQ.13I8EL6v-zBG1yTnnCHKuHafq1NeH8oJ8XjT5XMVrv-H5kb9EHj4kQ-wsB0fWtZFqONUQ51qzZmSaM7AtUnWNd82XjrzJmbSlagFj13_oczfZXsen8eqpR9VN7YIin9XlXi3egYGRu7ampRVNSTrmFuDkXgcqTS4zAHXROo3d-T13mRotP4pIqyQxsGCiHVff_k2H9Hb14wQFd6gQIWV-BZbRB7nHTwPUsuotnCZmz9_FnUxubGeKXNOeGLp-Zj5FZqWnfPyjoMmDBXIsEVDMwjjjtYMYih04ilVF1lqIfsZhOX4-3TzcK1ORrAfI0LSuSthTY8abIFRsJS_CL7Mmw'

let pending = null // mencegah banyak request token berjalan bersamaan

// ambil waktu expired (ms) dari klaim `exp` JWT
const getJwtExpMs = (token) => {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
        const json =
            typeof atob === 'function'
                ? atob(base64)
                : Buffer.from(base64, 'base64').toString()
        return Number(JSON.parse(json).exp) * 1000
    } catch {
        return 0
    }
}

const readCookie = () => {
    if (typeof document === 'undefined') return null
    const match = document.cookie
        .split('; ')
        .find((c) => c.startsWith(`${COOKIE_TOKEN_GUESTY}=`))
    return match
        ? decodeURIComponent(match.split('=').slice(1).join('='))
        : null
}

const writeCookie = (token, expMs) => {
    if (typeof document === 'undefined') return
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie =
        `${COOKIE_TOKEN_GUESTY}=${encodeURIComponent(token)}` +
        `; Expires=${new Date(expMs).toUTCString()}; Path=/; SameSite=Lax${secure}`
}

export const clearCookie = () => {
    if (typeof document === 'undefined') return
    document.cookie = `${COOKIE_TOKEN_GUESTY}=; Max-Age=0; Path=/`
}

const isValid = (token) =>
    !!token && Date.now() < getJwtExpMs(token) - REFRESH_BUFFER_MS

const saveToken = (token) => writeCookie(token, getJwtExpMs(token))

const fetchToken = async () => {
    const { data } = await axios.get(`${BASE_API_CRM}/guesty/token`)
    const accessToken = data?.result?.accessToken

    if (!accessToken) {
        throw new Error('accessToken Guesty tidak ada di response')
    }

    saveToken(accessToken)
    return accessToken
}

// dipakai juga oleh _guestyPaymentConfigAPI (pay.guesty.com)
export const getToken = () => {
    // seed cookie dengan token awal jika belum ada
    if (!readCookie() && isValid(INITIAL_TOKEN)) saveToken(INITIAL_TOKEN)

    const cached = readCookie()
    if (isValid(cached)) return Promise.resolve(cached)

    // expired / tidak ada -> ambil yang terbaru (hanya sekali)
    if (!pending) {
        pending = fetchToken().finally(() => {
            pending = null
        })
    }
    return pending
}

const guestyApi = axios.create({ baseURL: `${BASE_URL}` })

// token otomatis dipasang di setiap request
guestyApi.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`
    return config
})

// token ditolak (mis. dicabut) -> hapus cookie agar request berikutnya ambil baru
guestyApi.interceptors.response.use(undefined, (error) => {
    if (error?.response?.status === 401) clearCookie()
    return Promise.reject(error)
})

export const guestyGet = (endpoint, params = null) =>
    guestyApi.get(endpoint, params ? { params } : {})

export const guestyPost = (endpoint, body) => guestyApi.post(endpoint, body)
