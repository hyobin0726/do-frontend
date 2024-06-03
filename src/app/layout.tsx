import type { Metadata, Viewport } from 'next'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import KakaoScript from '@/providers/KakaoScript'

declare global {
    interface Window {
        Kakao: any
    }
}

export const metadata: Metadata = {
    title: '취미하다',
    description: '취미하다 HOBBING',
}

//모바일 input 확대 방지
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
