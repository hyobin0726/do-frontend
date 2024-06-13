import process from 'process'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.amazonaws.com',
            },
        ],
    },
    env: {
        BASE_URL: process.env.BASE_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        KAKAO_API_KEY: process.env.KAKAO_API_KEY,
        KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
        AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
        AWS_S3_REGION: process.env.AWS_S3_REGION,
        AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
        AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    },
}

export default nextConfig
