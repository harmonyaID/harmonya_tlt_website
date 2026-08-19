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
}

export default nextConfig
