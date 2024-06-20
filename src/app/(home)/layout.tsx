import RegionSelector from '@/components/common/RegionSelector'
import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'
import getBaseRegion from '@/api/crew/getBaseRegion'
import getRegionList from '@/api/crew/getRegionList'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const baseRegionData = await getBaseRegion()
    const regionList = await getRegionList()

    return (
        <>
            <MainHeader title="홈">
                {regionList && baseRegionData && (
                    <RegionSelector baseRegionData={baseRegionData} regionList={regionList} />
                )}
            </MainHeader>
            {children}
            <MainNavigation />
        </>
    )
}
