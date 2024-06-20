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
    baseRegionData,
    regionList,
}: {
    baseRegionData: RegionType
    regionList: RegionType[]
}) {
    const [position, setPosition] = useState<RegionType>(baseRegionData)
    const router = useRouter()

    useEffect(() => {
        if (position.regionId !== baseRegionData.regionId) {
            postBaseRegion(position.regionId)
            router.refresh()
        }
    }, [position])

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
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={(value) => {
                        setPosition(value as RegionType)
                    }}
                    className="m-1"
                >
                    {regionList.map((region) => (
                        <DropdownMenuRadioItem
                            key={region.regionId}
                            value={region}
                            className={`${position.addressName == region.addressName ? 'bg-hobbing-bg-pink rounded-md' : ''}`}
                        >
                            <div
                                className={`flex flex-row items-center pr-2 ${position.addressName != region.addressName ? 'opacity-0 ' : ''}`}
                            >
                                <Location />
                            </div>
                            {region.addressName}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
