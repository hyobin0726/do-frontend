import MainNavigation from '@/components/layouts/MainNavigation'

export default function MypageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <MainNavigation />
        </>
    )
}
