'use client'

import MainNavigation from '@/components/layouts/MainNavigation'
import { signOut } from 'next-auth/react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <MainNavigation />
            <div onClick={() => signOut()}>test</div>
        </>
    )
}
