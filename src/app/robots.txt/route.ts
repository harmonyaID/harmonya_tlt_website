// src/app/robots.txt/route.ts
// Menampilkan isi data/robots.txt di /robots.txt (sama seperti /llms.txt)

import { readFile } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'robots.txt')

    const content = await readFile(filePath, 'utf8')

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    })
}
