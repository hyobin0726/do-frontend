export { default } from 'next-auth/middleware'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

export async function middleware(req: NextRequest) {
    const session = await getToken({ req, secret, raw: true })
    const { pathname } = req.nextUrl

    // 정적 파일 및 API 요청 무시
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    // 로그인/회원가입 접근 제한
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        if (session) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    // 로그인하지 않은 사용자 접근 제한
    if (!session && pathname !== '/login' && pathname !== '/signup' && !pathname.startsWith('/account')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*', '/login', '/signup'],
}
