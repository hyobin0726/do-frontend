import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials: {
        //         loginId: { label: 'Login ID', type: 'text' },
        //         password: { label: 'Password', type: 'password' },
        //     },
        //     async authorize(credentials, req) {
        //         if (!credentials?.loginId || !credentials?.password) {
        //             return null
        //         }
        // const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         loginId: credentials.loginId,
        //         password: credentials.password,
        //     }),
        // })
        // if (res.ok) {
        //     const user = await res.json()
        //     console.log(user)

        //     return user
        // }
        //         const user = { id: 'qwe123', password: 'qwe123' }
        //         if (user) return user
        //         return null
        //     },
        // }),
    ],
    callbacks: {},
    pages: {
        signIn: '/login',
        error: '/auth_error',
    },
    secret: process.env.AUTH_SECRET,
}
