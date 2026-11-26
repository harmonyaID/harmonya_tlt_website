// =====================================================================
// GUESTY V2 SERVER PROXY
// Browser -> /api/v2/guesty/v1/...  -> (server) open-api.guesty.com/v1/...
// - menghindari CORS (Guesty Open API tidak mengizinkan request dari browser)
// - token Guesty hanya ada di server
// Route ini publik, jadi endpoint dibatasi dengan whitelist per method.
// =====================================================================
import { NextRequest, NextResponse } from 'next/server'
import { guestyServerRequest } from '@/service/api/guesty/server/_guestyServerV2.config'

// pola endpoint yang boleh diteruskan (`*` = 1 segment id)
const ALLOWED: Record<'GET' | 'POST', string[]> = {
    GET: [
        '/v1/listings',
        '/v1/listings/*',
        '/v1/listings/*/calendar',
        '/v1/availability-pricing/api/calendar/listings/*',
        '/v1/quotes/*',
    ],
    POST: [
        '/v1/quotes',
        '/v1/guests-crud',
        '/v1/reservations-v3/quote',
        '/v1/payment-methods',
        '/v1/payments',
        '/v1/payments/*/pay',
    ],
}

const SEGMENT = /^[A-Za-z0-9_-]+$/

const isAllowed = (method: 'GET' | 'POST', segments: string[]) => {
    if (!segments.every((s) => SEGMENT.test(s))) return false

    return ALLOWED[method].some((pattern) => {
        const parts = pattern.split('/').filter(Boolean)
        return (
            parts.length === segments.length &&
            parts.every((p, i) => p === '*' || p === segments[i])
        )
    })
}

const handle = async (
    req: NextRequest,
    ctx: RouteContext<'/api/v2/guesty/[...path]'>,
    method: 'GET' | 'POST',
) => {
    const { path } = await ctx.params

    if (!isAllowed(method, path)) {
        return NextResponse.json(
            { message: 'Endpoint not allowed' },
            { status: 403 },
        )
    }

    const endpoint = `/${path.join('/')}`

    try {
        let body: unknown
        if (method === 'POST') body = await req.json().catch(() => ({}))

        // create quote: source selalu statik "Website"
        if (method === 'POST' && endpoint === '/v1/quotes') {
            body = { ...(body as object), source: 'Website' }
        }

        const res = await guestyServerRequest(method, endpoint, {
            params: req.nextUrl.searchParams,
            body,
        })

        // status & body Guesty diteruskan apa adanya
        // (client membaca error.response.data.error.message)
        return NextResponse.json(res.data, { status: res.status })
    } catch (err: any) {
        console.error('Guesty v2 proxy error:', method, endpoint, err?.message)
        return NextResponse.json(
            { message: 'Guesty request failed' },
            { status: 502 },
        )
    }
}

export const GET = (
    req: NextRequest,
    ctx: RouteContext<'/api/v2/guesty/[...path]'>,
) => handle(req, ctx, 'GET')

export const POST = (
    req: NextRequest,
    ctx: RouteContext<'/api/v2/guesty/[...path]'>,
) => handle(req, ctx, 'POST')
