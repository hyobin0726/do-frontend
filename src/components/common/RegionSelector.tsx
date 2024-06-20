'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Location from '@/components/images/Location'
import postBaseRegion from '@/api/crew/postBaseRegion'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface RegionType {
    regionId: number
    addressName: string
}

export default function RegionSelector({
    baseRegionData, //현재 기본활동지역 data
    regionList, //등록된 활동지역 리스트 data
}: {
    baseRegionData: RegionType
    regionList: RegionType[]
}) {
    const [position, setPosition] = useState<string>(baseRegionData.addressName)
    const router = useRouter()

    const changeBaseRegion = async (regionId: number) => {
        if (regionId === baseRegionData.regionId) {
            //선택한지역이 이미 기본활동지역인 경우
            return
        }
        const data = await postBaseRegion(regionId)
        console.log('Region changed:', data)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="w-[150px] h-full pl-3 space-x-2 rounded-xl border-[1px] flex flex-row justify-between items-center bg-hobbing-light-pink border-hobbing-pink">
                    <div className="flex flex-row items-center">
                        <Location />
                    </div>
                    <div className="w-full h-full flex flex-col justify-center">
                        <p className="text-sm font-medium">{baseRegionData.addressName}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px] bg-hobbing-light-pink z-[1000]">
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="m-1">
                    {regionList.map((region) => (
                        <DropdownMenuRadioItem
                            key={region.regionId}
                            value={region.addressName}
                            className={`${position == region.addressName ? 'bg-hobbing-bg-pink rounded-md' : ''}`}
                        >
                            <div
                                className="w-full h-full flex flex-row"
                                onClick={() => {
                                    changeBaseRegion(region.regionId)
                                }}
                            >
                                <div
                                    className={`flex flex-row items-center pr-2 ${position != region.addressName ? 'opacity-0 ' : ''}`}
                                >
                                    <Location />
                                </div>
                                {region.addressName}
                            </div>
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
