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
            async authorize(credentials, req) {
                if (!credentials?.loginId || !credentials?.password) {
                    console.log('credentials is null')
                    return null
                }
                try {
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
                    if (data.isSuccess) {
                        return data.data
                    }
                    return null
                } catch (error) {
                    console.error('Error during login:', error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, profile }): Promise<any> {
            if (profile) {
                try {
                    const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/login/google`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            externalId: profile.sub,
                            name: profile.given_name,
                            email: profile.email,
                        }),
                    })
                    const data = await res.json()
                    if (!data.isSuccess) {
                        return `/signup?step=2&name=${profile.given_name}&email=${profile.email}&externalId=${profile.sub}`
                    } else {
                        user.accessToken = data.data.accessToken
                        user.refreshToken = data.data.refreshToken
                        user.uuid = data.data.uuid
                        return true
                    }
                } catch (error) {
                    console.error('Error during Google login:', error)
                    return false
                }
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.uuid = user.uuid
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                uuid: token.uuid,
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
    },
    pages: {
        signIn: '/login',
        error: '/auth_error',
    },
    secret: process.env.AUTH_SECRET,
}
