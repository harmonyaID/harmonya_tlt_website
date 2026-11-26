// =====================================================================
// GUESTY V2 SERVER — HANYA dipakai di server (Route Handler /api/v2/guesty)
//
// Kenapa lewat server?
// - open-api.guesty.com tidak mengirim header CORS -> request dari browser
//   (preflight OPTIONS) selalu ditolak. Server -> server tidak kena CORS.
// - Token Guesty (permission admin) tidak pernah dikirim ke browser.
//
// JANGAN import file ini dari komponen / hook client.
// =====================================================================

const GUESTY_BASE_URL = 'https://open-api.guesty.com'
const CRM_BASE_API = process.env.NEXT_PUBLIC_CRM_BASE_API
const REFRESH_BUFFER_MS = 5 * 60 * 1000 // anggap expired 5 menit sebelum habis

let cache: { token: string; expMs: number } | null = null
let pending: Promise<string> | null = null

// ambil waktu expired (ms) dari klaim `exp` JWT
const getJwtExpMs = (token: string) => {
    try {
        const payload = token.split('.')[1]
        const json = Buffer.from(payload, 'base64url').toString()
        return Number(JSON.parse(json).exp) * 1000
    } catch {
        return 0
    }
}

const fetchToken = async () => {
    const res = await fetch(`${CRM_BASE_API}/guesty/token`, {
        cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    const token = data?.result?.accessToken

    if (!res.ok || !token) {
        throw new Error('Gagal mengambil token Guesty dari CRM')
    }

    // fallback 50 menit bila token bukan JWT
    const expMs = getJwtExpMs(token) || Date.now() + 50 * 60 * 1000
    cache = { token, expMs }
    return token
}

const getToken = async (forceRefresh = false) => {
    if (
        !forceRefresh &&
        cache &&
        Date.now() < cache.expMs - REFRESH_BUFFER_MS
    ) {
        return cache.token
    }

    // banyak request bersamaan -> cukup 1 request token
    if (!pending) {
        pending = fetchToken().finally(() => {
            pending = null
        })
    }
    return pending
}

export type GuestyServerResponse = {
    status: number
    data: any
}

// request ke Guesty Open API (endpoint diawali /v1/...)
export const guestyServerRequest = async (
    method: 'GET' | 'POST',
    endpoint: string,
    {
        params,
        body,
    }: {
        params?: URLSearchParams
        body?: unknown
    } = {},
): Promise<GuestyServerResponse> => {
    const query = params?.toString()
    const url = `${GUESTY_BASE_URL}${endpoint}${query ? `?${query}` : ''}`

    const send = async (token: string) => {
        // jangan pernah kirim "Bearer " kosong
        if (!token?.trim()) throw new Error('Token Guesty kosong')

        return fetch(url, {
            method,
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.trim()}`, // token dinamis
            },
            ...(method === 'POST' && { body: JSON.stringify(body ?? {}) }),
        })
    }

    let res = await send(await getToken())

    // token dicabut / expired lebih cepat -> ambil token baru, ulangi 1x
    if (res.status === 401) {
        cache = null
        res = await send(await getToken(true))
    }

    const text = await res.text()
    let data: any = null
    try {
        data = text ? JSON.parse(text) : null
    } catch {
        data = { message: text }
    }

    return { status: res.status, data }
}
