import Location from '@/components/images/Location'
import getBaseRegion from '@/api/crew/getBaseRegion'

export default async function RegionSelector() {
    const baseRegionData = await getBaseRegion()

    return (
        <>
            <div className="w-3/5 h-full pl-3 space-x-3 rounded-xl border-[1px] flex flex-row justify-between items-center bg-hobbing-light-pink border-hobbing-pink">
                <div className="flex flex-row items-center">
                    <Location />
                </div>
                <div className="w-full h-full flex flex-col justify-center">
                    <p className="text-sm font-medium">{baseRegionData.addressName}</p>
                </div>
            </div>
        </>
    )
}
