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
            //     console.log('profile externalId', profile.sub)
            //     console.log('profile name', profile.name)
            //     console.log('profile email', profile.email)
            //     const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/login/google`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             externalId: profile.sub,
            //             name: profile.name,
            //             email: profile.email,
            //         }),
            //     })
            //     if (res.ok) {
            //         const getData = await res.json()
            //         console.log('res.ok -> google user : ', getData, profile.name)
            //         return false
            //     } else {
            //         console.log('google user', res.statusText)
            //         return false
            //     }
            // }
            return true

            // console.log('user', user)
        },
        async jwt({ token, user }) {
            if (user) {
                // 사용자가 처음 로그인할 때 user 객체가 존재
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.uuid = user.uuid
            }
            return token
        },

        async session({ session, token }) {
            session.user = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                uuid: token.uuid,
            }
            // console.log('session async function session : ', session)
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
