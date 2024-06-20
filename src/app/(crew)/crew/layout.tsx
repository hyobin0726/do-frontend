import MainNavigation from '@/components/layouts/MainNavigation'
import RegionSelector from '@/components/common/RegionSelector'
import MainHeader from '@/components/layouts/MainHeader'
import getBaseRegion from '@/api/crew/getBaseRegion'
import getRegionList from '@/api/crew/getRegionList'

export default async function CrewLayout({ children }: { children: React.ReactNode }) {
    const baseRegionData = await getBaseRegion()
    const regionList = await getRegionList()

    return (
        <>
            <MainHeader title="소모임">
                {regionList && baseRegionData && (
                    <RegionSelector baseRegionData={baseRegionData} regionList={regionList} />
                )}
            </MainHeader>
            {children}
            <MainNavigation />
        </>
    )
}
