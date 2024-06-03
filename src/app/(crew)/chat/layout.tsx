import MainNavigation from '@/components/layouts/MainNavigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <MainNavigation />
        </>
    )
}
