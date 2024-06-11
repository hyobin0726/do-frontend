import MainNavigation from '@/components/layouts/MainNavigation'
import MainHeader from '@/components/layouts/MainHeader'

export default function CrewLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="소모임" />
            {children}
            <MainNavigation />
        </>
    )
}
