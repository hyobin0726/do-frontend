import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <MainHeader title="게시판" />
            {children}
            <MainNavigation />
        </main>
    )
}
