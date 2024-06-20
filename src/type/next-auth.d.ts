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
    interface User {
        accessToken: string
        refreshToken: string
        name: string
        email: string
        uuid: string
    }
    interface Profile {
        sub: string
        given_name: string
        email: string
    }
}
