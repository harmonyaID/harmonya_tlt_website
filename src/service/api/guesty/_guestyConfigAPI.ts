// import axios from 'axios'
//
// // const BASE_URL = 'https://booking.guesty.com'
// const BASE_URL = 'https://open-api.guesty.com'
// let cache = { token: null, exp: 0 }
//
// const getToken = async () => {
//     if (cache.token && Date.now() < cache.exp) return cache.token
//
//     const { data = '' } = await axios.post(
//         `${BASE_URL}/oauth2/token`,
//
//         //@ts-ignore
//         new URLSearchParams({
//             //@ts-ignore
//             // grant_type: 'client_credentials',
//             //@ts-ignore
//             // scope: 'booking_engine:api',
//             grant_type: 'client_credentials',
//             scope: 'open-api',
//
//             //@ts-ignore
//             client_id: process.env.NEXT_PUBLIC_GUESTY_CLIENT_ID,
//             //@ts-ignore
//             client_secret: process.env.NEXT_PUBLIC_GUESTY_CLIENT_SECRET,
//         }),
//         {
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         },
//     )
//
//     cache = {
//         token: data.access_token,
//         exp: Date.now() + (data.expires_in - 300) * 1000,
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

// V2
// import axios from 'axios'
//
// const BASE_URL = 'https://open-api.guesty.com'
// const REFRESH_MARGIN = 30 * 60 * 1000 // refresh 30 menit sebelum expired
//
// // globalThis: cache tidak hilang saat hot reload / module dimuat ulang
// const g = globalThis as any
// g.__guestyAuth ??= {
//     token: null,
//     exp: 0,
//     fetchedAt: 0,
//     blockedUntil: 0,
//     pending: null,
// }
// const state = g.__guestyAuth
//
// const requestToken = async (): Promise<string> => {
//     const client_id = process.env.NEXT_PUBLIC_GUESTY_CLIENT_ID
//     const client_secret = process.env.NEXT_PUBLIC_GUESTY_CLIENT_SECRET
//
//     if (!client_id || !client_secret) {
//         throw new Error('GUESTY client id / secret belum di-set')
//     }
//
//     try {
//         const { data } = await axios.post(
//             `${BASE_URL}/oauth2/token`,
//             new URLSearchParams({
//                 grant_type: 'client_credentials',
//                 scope: 'open-api',
//                 client_id,
//                 client_secret,
//             }),
//             {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             },
//         )
//
//         state.token = data.access_token
//         state.exp = Date.now() + data.expires_in * 1000 - REFRESH_MARGIN
//         state.fetchedAt = Date.now()
//         return state.token
//     } catch (err: any) {
//         console.error(
//             'Guesty token error:',
//             err.response?.status,
//             err.response?.data,
//         )
//         // 429: tahan 30 menit, error lain: 1 menit, supaya kuota token tidak terbuang
//         state.blockedUntil =
//             Date.now() + (err.response?.status === 429 ? 30 : 1) * 60 * 1000
//         throw err
//     }
// }
//
// const getToken = async (force = false): Promise<string> => {
//     if (!force && state.token && Date.now() < state.exp) return state.token
//
//     if (Date.now() < state.blockedUntil) {
//         throw new Error('Guesty token sedang dibatasi, coba lagi nanti')
//     }
//
//     // request token yang bersamaan digabung jadi satu
//     if (!state.pending) {
//         state.pending = requestToken().finally(() => {
//             state.pending = null
//         })
//     }
//     return state.pending
// }
//
// // Open API memakai /v1 (bukan /api seperti Booking Engine)
// const guestyApi = axios.create({ baseURL: `${BASE_URL}/v1` })
//
// // token otomatis dipasang di setiap request
// guestyApi.interceptors.request.use(async (config) => {
//     config.headers.Authorization = `Bearer ${await getToken()}`
//     return config
// })
//
// // token ditolak (401/403): ambil token baru lalu ulangi request satu kali
// guestyApi.interceptors.response.use(undefined, async (error) => {
//     const { config, response } = error
//     const tokenOldEnough = Date.now() - state.fetchedAt > 60 * 1000 // cegah refresh beruntun
//
//     if (
//         [401, 403].includes(response?.status) &&
//         config &&
//         !config._retry &&
//         tokenOldEnough
//     ) {
//         config._retry = true
//         config.headers.Authorization = `Bearer ${await getToken(true)}`
//         return guestyApi(config)
//     }
//     return Promise.reject(error)
// })
//
// // GET: jika gagal, kembalikan data null (halaman tampil kosong, tidak crash)
// export const guestyGet = async (
//     endpoint: string,
//     params: Record<string, unknown> | null = null,
// ) => {
//     try {
//         return await guestyApi.get(endpoint, params ? { params } : {})
//     } catch (err: any) {
//         console.error(
//             'guestyGet gagal:',
//             endpoint,
//             err.response?.status ?? err.message,
//         )
//         return { data: null }
//     }
// }
//
// // POST (booking, pembayaran): error sengaja dilempar supaya tidak terlihat berhasil
// export const guestyPost = (endpoint: string, body?: unknown) =>
//     guestyApi.post(endpoint, body)

// V3
// src/service/api/guesty/_guestyConfigAPI.ts
import axios from 'axios'

const BASE_URL = 'https://open-api.guesty.com'
const REFRESH_MARGIN = 30 * 60 * 1000 // refresh 30 menit sebelum expired

// globalThis: cache tidak hilang saat hot reload
const g = globalThis as any
g.__guestyAuth ??= {
    token: null,
    exp: 0,
    fetchedAt: 0,
    blockedUntil: 0,
    pending: null,
}
const state = g.__guestyAuth

const requestToken = async (): Promise<string> => {
    const client_id = process.env.NEXT_PUBLIC_GUESTY_CLIENT_ID
    const client_secret = process.env.NEXT_PUBLIC_GUESTY_CLIENT_SECRET

    if (!client_id || !client_secret) {
        throw new Error(
            'GUESTY_CLIENT_ID / GUESTY_CLIENT_SECRET belum di-set (atau file ini dipanggil dari browser)',
        )
    }

    try {
        const { data } = await axios.post(
            `${BASE_URL}/oauth2/token`,
            new URLSearchParams({
                grant_type: 'client_credentials',
                scope: 'open-api',
                client_id,
                client_secret,
            }),
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        )

        state.token = data.access_token
        state.exp = Date.now() + data.expires_in * 1000 - REFRESH_MARGIN
        state.fetchedAt = Date.now()
        return state.token
    } catch (err: any) {
        console.error(
            'Guesty token error:',
            err.response?.status,
            err.response?.data,
        )
        // 429: tahan 30 menit, error lain: 1 menit, supaya kuota token tidak terbuang
        state.blockedUntil =
            Date.now() + (err.response?.status === 429 ? 30 : 1) * 60 * 1000
        throw err
    }
}

const getToken = async (force = false): Promise<string> => {
    if (!force && state.token && Date.now() < state.exp) return state.token

    if (Date.now() < state.blockedUntil) {
        throw new Error('Guesty token sedang dibatasi (429), coba lagi nanti')
    }

    // request token yang bersamaan digabung jadi satu
    if (!state.pending) {
        state.pending = requestToken().finally(() => {
            state.pending = null
        })
    }
    return state.pending
}

const guestyApi = axios.create({ baseURL: `${BASE_URL}/v1` })

guestyApi.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`
    return config
})

// token ditolak (401/403): ambil token baru, ulangi request satu kali
guestyApi.interceptors.response.use(undefined, async (error) => {
    const { config, response } = error
    const tokenOldEnough = Date.now() - state.fetchedAt > 60 * 1000

    if (
        [401, 403].includes(response?.status) &&
        config &&
        !config._retry &&
        tokenOldEnough
    ) {
        config._retry = true
        config.headers.Authorization = `Bearer ${await getToken(true)}`
        return guestyApi(config)
    }
    return Promise.reject(error)
})

// error dilempar apa adanya, yang memanggil yang memutuskan cara menanganinya
export const guestyGet = (
    endpoint: string,
    params: Record<string, unknown> | null = null,
) => guestyApi.get(endpoint, params ? { params } : {})

export const guestyPost = (endpoint: string, body?: unknown) =>
    guestyApi.post(endpoint, body)
