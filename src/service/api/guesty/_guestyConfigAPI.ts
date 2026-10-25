import axios from 'axios'

const BASE_URL = 'https://booking.guesty.com'
let cache = { token: null, exp: 0 }

const getToken = async () => {
    if (cache.token && Date.now() < cache.exp) return cache.token

    const { data } = await axios.post(
        `${BASE_URL}/oauth2/token`,

        //@ts-ignore
        new URLSearchParams({
            //@ts-ignore
            grant_type: 'client_credentials',
            //@ts-ignore
            scope: 'booking_engine:api',
            //@ts-ignore
            client_id: process.env.GUESTY_CLIENT_ID,
            //@ts-ignore
            client_secret: process.env.GUESTY_CLIENT_SECRET,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
        },
    )

    cache = {
        token: data.access_token,
        exp: Date.now() + (data.expires_in - 300) * 1000,
    }
    return cache.token
}

const guestyApi = axios.create({ baseURL: `${BASE_URL}/api` })

// token otomatis dipasang di setiap request
guestyApi.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`
    return config
})

export const guestyGet = (endpoint, params) =>
    guestyApi.get(endpoint, { params })
export const guestyPost = (endpoint, body) => guestyApi.post(endpoint, body)
