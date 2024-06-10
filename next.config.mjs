import process from 'process'

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        KAKAO_API_KEY: process.env.KAKAO_API_KEY,
        KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    },
}

export default nextConfig
