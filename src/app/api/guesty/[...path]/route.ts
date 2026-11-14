// // app/api/guesty/[...path]/route.js
// import { NextResponse } from 'next/server'
// import { guestyGet, guestyPost } from '@/service/api/guesty/_guestyConfigAPI'
//
// // whitelist, supaya proxy tidak bisa dipakai untuk endpoint lain
// const ALLOWED = ['/listings', '/reservations/quotes']
//
// const handle = async (req, ctx, method) => {
//     const { path } = await ctx.params // Next 15: params adalah Promise
//     const endpoint = `/${path.join('/')}`
//
//     if (!ALLOWED.some((p) => endpoint.startsWith(p))) {
//         return NextResponse.json(
//             { message: 'Endpoint not allowed' },
//             { status: 403 },
//         )
//     }
//
//     try {
//         const res =
//             method === 'get'
//                 ? await guestyGet(
//                       endpoint,
//                       Object.fromEntries(new URL(req.url).searchParams),
//                   )
//                 : await guestyPost(endpoint, await req.json())
//
//         return NextResponse.json(res.data)
//     } catch (err) {
//         return NextResponse.json(
//             //@ts-ignore
//             err?.response?.data ?? { message: err?.message },
//             //@ts-ignore
//             { status: err?.response?.status ?? 500 },
//         )
//     }
// }
//
// export const GET = (req, ctx) => handle(req, ctx, 'get')
// export const POST = (req, ctx) => handle(req, ctx, 'post')

// V3
// app/api/guesty/[...path]/route.js
import { NextResponse } from 'next/server'
import { guestyGet, guestyPost } from '@/service/api/guesty/_guestyConfigAPI'

// whitelist per method, karena route ini publik
const ALLOWED = {
    get: ['/listings'],
    post: ['/quotes'],
}

const isAllowed = (method, segments) => {
    if (segments.some((s) => !s || s === '.' || s === '..')) return false
    const endpoint = `/${segments.join('/')}`
    return ALLOWED[method].some(
        (p) => endpoint === p || endpoint.startsWith(`${p}/`),
    )
}

const handle = async (req, ctx, method) => {
    const { path } = await ctx.params // Next 15: params adalah Promise

    if (!isAllowed(method, path)) {
        return NextResponse.json(
            { message: 'Endpoint not allowed' },
            { status: 403 },
        )
    }
    const endpoint = `/${path.join('/')}`

    try {
        const res =
            method === 'get'
                ? await guestyGet(
                      endpoint,
                      Object.fromEntries(new URL(req.url).searchParams),
                  )
                : await guestyPost(endpoint, await req.json())

        return NextResponse.json(res.data)
    } catch (err) {
        console.error(
            'Guesty proxy error:',
            method,
            endpoint,
            err?.response?.status ?? err?.message,
        )
        return NextResponse.json(
            { message: 'Guesty request failed' },
            { status: err?.response?.status ?? 500 },
        )
    }
}

export const GET = (req, ctx) => handle(req, ctx, 'get')
export const POST = (req, ctx) => handle(req, ctx, 'post')
