import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    env: {
        CMS_BASE_API:
            'https://dev.api.thelembongantraveller.harmonya-technologies.com/api/public',
    },

    // Image Source
    images: {
        dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
        remotePatterns: [
            {
                protocol: 'https',
                hostname:
                    'dev.api.thelembongantraveller.harmonya-technologies.com',
                pathname: '/storage/images/**',
            },
        ],
    },

    // Handle Stop Double Get
    reactStrictMode: false,

    // Guesty Open API tidak mengizinkan CORS dari browser.
    // Browser memanggil /guesty-open-api/... (same origin), Next meneruskan
    // request apa adanya (Authorization Bearer, Content-Type) ke Guesty.
    async rewrites() {
        return [
            {
                source: '/guesty-open-api/:path*',
                destination: 'https://open-api.guesty.com/:path*',
            },
        ]
    },

    // API handle file llms.txt
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,POST,PUT,DELETE,OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
