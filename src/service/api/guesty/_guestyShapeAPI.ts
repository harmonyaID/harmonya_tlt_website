import axios from 'axios'

const api = axios.create({ baseURL: '/api/guesty' })

export const get = async (endpoint, params) => {
    const { data } = await api.get(endpoint, { params })
    return data
}

export const post = async (endpoint, body) => {
    const { data } = await api.post(endpoint, body)
    return data
}
