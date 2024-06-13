import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                loginId: { label: 'loginId', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req): Promise<any> {
                if (!credentials?.loginId || !credentials?.password) {
                    console.log('credentials is null')
                    return null
                }
                const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        loginId: credentials.loginId,
                        password: credentials.password,
                    }),
                })
                const data = await res.json()
                if (data.isSuccess === true) {
                    return data.data
                }
                return null
            },
        }),
    ],
    callbacks: {
        async signIn({ user, profile }) {
            // user = Credential
            // profile = Google
            // console.log('user', user)
            // console.log('profile', profile)
            // if (profile) {
            //     console.log('profile', profile)
            //     return true
            // }
            // console.log('user', user)
            return true
        },
        async jwt({ token, user }) {
            // if (user) {
            //     console.log('jwt async function user : ', user)
            // }
            // if (token) {
            //     console.log('jwt async function token : ', token)
            // }
            return { ...token, ...user }
        },

        async session({ session, token }) {
            // if (token) {
            //     console.log('session async function token : ', token)
            // }
            // if (session) {
            //     console.log('session async function session : ', session)
            // }
            session.user = token as any
            return session
        },

        async redirect({ url, baseUrl }) {
            // if (url) {
            //     console.log('redirect async function url : ', url)
            // }
            // if (baseUrl) {
            //     console.log('redirect async function baseUrl : ', baseUrl)
            // }
            return url.startsWith(baseUrl) ? url : baseUrl
        },
    },
    pages: {
        signIn: '/login',
        error: '/auth_error',
    },
    secret: process.env.AUTH_SECRET,
}
