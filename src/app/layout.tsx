import type { Metadata, Viewport } from 'next'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import KakaoScript from '@/providers/KakaoScript'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

declare global {
    interface Window {
        Kakao: any
    }
}

//모바일 input 확대 방지
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    title: '취미하다',
    description: '취미하다 HOBBING',
    icons: {
        icon: '/icons/icon-192x192.png',
        apple: '/icons/icon-192x192.png',
    },
    manifest: '/manifest.json',
}


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const session = await getServerSession(options);

    return (
        <html lang="ko">
            <body>
                <AuthProvider session={session}>{children}</AuthProvider>
            </body>
            <KakaoScript />
        </html>
    )
}
