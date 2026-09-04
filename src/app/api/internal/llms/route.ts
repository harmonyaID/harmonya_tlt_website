import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'data', 'llms.txt')

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': '*',
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    })
}

export async function GET() {
    try {
        const content = await readFile(FILE_PATH, 'utf8')

        return Response.json(
            {
                success: true,
                content,
            },
            {
                headers: corsHeaders(),
            },
        )
    } catch (error) {
        console.error(error)

        return Response.json(
            {
                success: false,
                error: 'File tidak ditemukan',
            },
            {
                status: 404,
                headers: corsHeaders(),
            },
        )
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()

        if (typeof body.content !== 'string') {
            return Response.json(
                {
                    success: false,
                    error: 'content harus berupa string',
                },
                {
                    status: 400,
                    headers: corsHeaders(),
                },
            )
        }

        await writeFile(FILE_PATH, body.content, 'utf8')

        return Response.json(
            {
                success: true,
                message: 'llms.txt berhasil diupdate',
            },
            {
                headers: corsHeaders(),
            },
        )
    } catch (error) {
        console.error(error)

        return Response.json(
            {
                success: false,
                error: 'Gagal update llms.txt',
            },
            {
                status: 500,
                headers: corsHeaders(),
            },
        )
    }
}

// export async function GET() {
//     return new Response('API OK', {
//         status: 200,
//         headers: {
//             'Content-Type': 'text/plain',
//             'Access-Control-Allow-Origin': '*',
//         },
//     })
// }
