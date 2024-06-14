import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { signOut } from 'next-auth/react'

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
                    return {
                        ...data.data,
                        accessTokenExpires: Date.now() + 3 * 60 * 1000, // 3 minutes
                        refreshTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async signIn({ user, profile }) {
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.accessTokenExpires = user.accessTokenExpires
                token.refreshTokenExpires = user.refreshTokenExpires
                token.uuid = user.uuid
            } else if (Date.now() > token.refreshTokenExpires) {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                console.log('==============================================')
                console.log('Refresh token has expired')
                console.log('==============================================')
                signOut({ redirect: false })
                return {
                    ...token,
                    error: 'RefreshTokenExpired',
                }
            } else if (Date.now() > token.accessTokenExpires) {
                // Access token has expired, try to refresh it
                try {
                    console.log('token', token.accessToken)
                    console.log('token', token.refreshToken)
                    const response = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/re-issue`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            refreshToken: `${token.refreshToken}`,
                        }),
                    })
                    const data = await response.json()
                    console.log('data', data)
                    if (data.isSuccess === true) {
                        token.accessToken = data.data.accessToken
                        token.refreshToken = data.data.refreshToken // 갱신된 리프레시 토큰 저장
                        token.accessTokenExpires = Date.now() + 3 * 60 * 1000 // 3 minutes
                        token.refreshTokenExpires = Date.now() + 15 * 60 * 1000 // 15 minutes
                    } else {
                        throw new Error('Failed to refresh access token')
                    }
                } catch (error) {
                    console.log('==============================================')
                    console.error('Error refreshing access token', error)
                    console.log('==============================================')
                    return {
                        ...token,
                        error: 'RefreshAccessTokenError',
                    }
                }
            }
            // Refresh token has expired

            return token
        },
        async session({ session, token }) {
            console.log('token', token)
            console.log('==============================================')
            console.log('token.iat', new Date(token.iat * 1000).toLocaleString('ko-KR'))
            console.log('token.exp', new Date(token.exp * 1000).toLocaleString('ko-KR'))
            console.log('token.accessTokenExpires', new Date(token.accessTokenExpires).toLocaleString('ko-KR'))
            console.log('token.refreshTokenExpires', new Date(token.refreshTokenExpires).toLocaleString('ko-KR'))
            console.log('==============================================')
            session.user = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                uuid: token.uuid,
            }
            session.error = token.error
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
