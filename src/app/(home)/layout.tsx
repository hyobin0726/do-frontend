import MainNavigation from '@/components/layouts/MainNavigation'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <MainNavigation />
            <div>test</div>
        </>
    )
}
