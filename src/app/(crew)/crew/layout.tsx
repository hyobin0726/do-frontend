import MainNavigation from '@/components/layouts/MainNavigation'
import RegionSelector from '@/components/common/RegionSelector'
import MainHeader from '@/components/layouts/MainHeader'

export default function CrewLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="소모임">
                <RegionSelector />
            </MainHeader>
            {children}
            <MainNavigation />
        </>
    )
}
