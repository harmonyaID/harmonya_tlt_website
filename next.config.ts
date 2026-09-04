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
