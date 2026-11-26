// =====================================================================
// GUESTY V2 — axios client
// =====================================================================
import axios from 'axios'
import { clearCookie, getToken } from '@/service/api/guesty/_guestyConfigAPI'

// ---------- via server (/api/v2/guesty) ----------
const guestyServerV2Api = axios.create({ baseURL: '/api/v2/guesty' })

export const guestyServerV2Get = (
    endpoint: string,
    params: Record<string, any> | null = null,
) => guestyServerV2Api.get(endpoint, params ? { params } : {})

export const guestyServerV2Post = (endpoint: string, body = {}) =>
    guestyServerV2Api.post(endpoint, body)

// ---------- langsung ke Guesty Open API ----------
// Authorization dinamis, sama seperti tab "Authorization" di Postman:
// - authType : 'Bearer Token' | 'No Auth'
// - token    : diambil dinamis dari getToken() setiap request
// Auth type "Bearer Token" -> header `Authorization: Bearer <token>`
export type GuestyAuthType = 'Bearer Token' | 'No Auth'

export const GUESTY_AUTH_CONFIG: {
    authType: GuestyAuthType
    getToken: () => Promise<string>
} = {
    authType: 'Bearer Token',
    getToken,
}

const buildAuthorization = (authType: GuestyAuthType, token: string) => {
    switch (authType) {
        case 'Bearer Token':
            return `Bearer ${token}`
        default:
            return undefined
    }
}

const guestyDirectApi = axios.create({
    // = https://open-api.guesty.com (lewat rewrites di next.config.ts, hindari CORS)
    baseURL: '/guesty-open-api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

guestyDirectApi.interceptors.request.use(async (config) => {
    const { authType, getToken: getAuthToken } = GUESTY_AUTH_CONFIG

    if (authType !== 'No Auth') {
        const token = await getAuthToken()
        if (!token) throw new Error('Token Guesty kosong')

        const authorization = buildAuthorization(authType, token)
        if (authorization) config.headers.Authorization = authorization
    }

    config.headers['Content-Type'] = 'application/json'
    return config
})

// token ditolak -> hapus cookie supaya request berikutnya ambil token baru
guestyDirectApi.interceptors.response.use(undefined, (error) => {
    if (error?.response?.status === 401) clearCookie()
    return Promise.reject(error)
})

export const guestyDirectGet = (
    endpoint: string,
    params: Record<string, any> | null = null,
) => guestyDirectApi.get(endpoint, params ? { params } : {})

export const guestyDirectPost = (endpoint: string, body = {}) =>
    guestyDirectApi.post(endpoint, body)
