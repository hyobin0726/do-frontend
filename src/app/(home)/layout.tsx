'use client'

import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'
import { signOut } from 'next-auth/react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="홈" />
            <div onClick={() => signOut()}>test</div>
            {children}
            <MainNavigation />
        </>
    )
}
