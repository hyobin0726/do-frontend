import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'

export default function MypageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="마이페이지" />
            {children}
            <MainNavigation />
        </>
    )
}
