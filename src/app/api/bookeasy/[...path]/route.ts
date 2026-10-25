import { NextResponse } from 'next/server'
import {
    bookeasyGet,
    bookeasyPost,
} from '@/service/api/bookeasy/_bookeasyConfigAPI'

// isi dengan endpoint yang dipakai, cek di Swagger
const ALLOWED = ['/getAccomAttributes']

const handle = async (req, ctx, method) => {
    const { path } = await ctx.params
    const endpoint = `/${path.join('/')}`

    if (!ALLOWED.some((p) => endpoint.startsWith(p))) {
        return NextResponse.json(
            { message: 'Endpoint not allowed' },
            { status: 403 },
        )
    }

    try {
        const res =
            method === 'get'
                ? await bookeasyGet(
                      endpoint,
                      Object.fromEntries(new URL(req.url).searchParams),
                  )
                : await bookeasyPost(endpoint, await req.json())

        return NextResponse.json(res.data)
    } catch (err) {
        return NextResponse.json(
            //@ts-ignore
            err.response?.data ?? { message: err.message },
            //@ts-ignore
            { status: err.response?.status ?? 500 },
        )
    }
}

export const GET = (req, ctx) => handle(req, ctx, 'get')
export const POST = (req, ctx) => handle(req, ctx, 'post')
