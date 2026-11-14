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

// V2 Finnal
import axios from 'axios'

const BASE_API_CRM = process.env.NEXT_PUBLIC_CRM_BASE_API
// const BASE_URL = 'https://open-api.guesty.com'
const BASE_URL = 'https://open-api.guesty.com'
const REFRESH_BUFFER_MS = 5 * 60 * 1000 // refresh 5 menit sebelum habis

let cache = { token: null, exp: 0 }
let pending = null // mencegah banyak request token berjalan bersamaan

const fetchToken = async () => {
    const { data } = await axios.get(`${BASE_API_CRM}/guesty/token`)
    const result = data?.result || {}

    if (!result.accessToken) {
        throw new Error('accessToken Guesty tidak ada di response')
    }

    const expiresInMs = Number(result.expiresInSeconds) * 1000

    cache = {
        token: result.accessToken,
        exp: Date.now() + Math.max(expiresInMs - REFRESH_BUFFER_MS, 0),
    }
    return cache.token
}

const getToken = () => {
    if (cache.token && Date.now() < cache.exp)
        return Promise.resolve(cache.token)

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

export const guestyGet = (endpoint, params = null) =>
    guestyApi.get(endpoint, params ? { params } : {})

export const guestyPost = (endpoint, body) => guestyApi.post(endpoint, body)
