import axios from 'axios'

const bookeasyApi = axios.create({
    baseURL: process.env.BOOKEASY_BASE_URL, // https://webapi.bookeasy.com.au/api (PVT beda URL)
    headers: {
        Accept: 'application/json',
        apiKey: process.env.BOOKEASY_API_KEY,
    },
})

export const bookeasyGet = (endpoint, params) =>
    bookeasyApi.get(endpoint, { params })
export const bookeasyPost = (endpoint, body) => bookeasyApi.post(endpoint, body)
