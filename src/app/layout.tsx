import type { Metadata, Viewport } from 'next'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import KakaoScript from '@/providers/KakaoScript'

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
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
            <KakaoScript />
        </html>
    )
}
