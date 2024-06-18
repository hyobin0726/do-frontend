'use client'

import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="홈" />
            {children}
            <MainNavigation />
        </>
    )
}
