// export async function GET() {
//     const content = `# My Website
//
// > Website description
//
// ## Products
//
// - https://domain.com/product-1
// - https://domain.com/product-2
// `
//
//     return new Response(content, {
//         headers: {
//             'Content-Type': 'text/plain; charset=utf-8',
//         },
//     })
// }

// import { readFile } from 'fs/promises'
// import path from 'path'
//
// export async function GET() {
//     const filePath = path.join(process.cwd(), 'data', 'llms.txt')
//
//     const content = await readFile(filePath, 'utf-8')
//
//     return new Response(content, {
//         headers: {
//             'Content-Type': 'text/plain; charset=utf-8',
//         },
//     })
// }

// import { writeFile } from 'fs/promises'
// import path from 'path'
//
// export async function PUT(request: Request) {
//     // WAJIB: authentication admin di sini
//
//     const { content } = await request.json()
//
//     if (typeof content !== 'string') {
//         return Response.json({ error: 'Invalid content' }, { status: 400 })
//     }
//
//     const filePath = path.join(process.cwd(), 'data', 'llms.txt')
//
//     await writeFile(filePath, content, 'utf-8')
//
//     return Response.json({
//         success: true,
//     })
// }

// import { readFile } from 'fs/promises'
// import path from 'path'
//
// export const dynamic = 'force-dynamic'
//
// export async function GET() {
//     try {
//         const filePath = path.join(process.cwd(), 'data', 'llms.txt')
//
//         const content = await readFile(filePath, 'utf8')
//
//         return new Response(content, {
//             status: 200,
//             headers: {
//                 'Content-Type': 'text/plain; charset=utf-8',
//                 'Cache-Control': 'no-store, no-cache, must-revalidate',
//             },
//         })
//     } catch (error) {
//         console.error('Failed to read llms.txt:', error)
//
//         return new Response('llms.txt not found', {
//             status: 404,
//             headers: {
//                 'Content-Type': 'text/plain; charset=utf-8',
//             },
//         })
//     }
// }

// import { NextResponse } from 'next/server'
//
// export async function GET() {
//     try {
//         const response = await fetch(
//             `${process.env.PUBLIC_API_URL}/api/internal/llms`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.PUBLIC_API_SECRET}`,
//                 },
//                 cache: 'no-store',
//             },
//         )
//
//         const data = await response.json()
//
//         return NextResponse.json(data, {
//             status: response.status,
//         })
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Failed to get llms.txt',
//             },
//             {
//                 status: 500,
//             },
//         )
//     }
// }
//
// export async function PUT(request: Request) {
//     try {
//         const body = await request.json()
//
//         const response = await fetch(
//             `${process.env.PUBLIC_API_URL}/api/internal/llms`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${process.env.PUBLIC_API_SECRET}`,
//                 },
//                 body: JSON.stringify({
//                     content: body.content,
//                 }),
//             },
//         )
//
//         const data = await response.json()
//
//         return NextResponse.json(data, {
//             status: response.status,
//         })
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Failed to update llms.txt',
//             },
//             {
//                 status: 500,
//             },
//         )
//     }
// }

// src/app/llms.txt/route.ts

import { readFile } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'llms.txt')

    const content = await readFile(filePath, 'utf8')

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    })
}
