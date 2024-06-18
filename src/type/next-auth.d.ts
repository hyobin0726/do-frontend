import { DefaultSession } from 'next-auth/next'

declare module 'next-auth' {
    interface Session {
        user: {
            accessToken: string
            refreshToken: string
            name: string
            email: string
            uuid: string
        } & DefaultSession['user']
    }
}
