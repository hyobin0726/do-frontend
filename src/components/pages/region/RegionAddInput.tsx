'use client'

import { useState } from 'react'

import Input from '@/components/common/Input'
import Location from '@/components/images/Location'
import LocationModal from './LocationModal'

interface RegionAddInputProps {
    currentLatitude: number
    currentLongitude: number
    title: string
    required: boolean
    id: string
    name: string
    value: string
    regionRange: number
    onRegionChange: (regionname: string, regionCode: number, regionLatitude: number, regionLongitude: number) => void
    onRegionRangeChange: (range: number) => void
}

export default function RegionAddInput({
    currentLatitude,
    currentLongitude,
    title,
    id,
    name,
    required,
    value,
    regionRange,
    onRegionChange,
    onRegionRangeChange,
}: RegionAddInputProps) {
    const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false)

    const handleLocationModalOpen = () => {
        setLocationModalOpen(!locationModalOpen)
    }

    return (
        <>
            <div onClick={handleLocationModalOpen}>
                <Input
                    title={title}
                    required={required}
                    id={id}
                    name={name}
                    type="text"
                    placeholder={`${title}을 선택해주세요`}
                    value={value}
                    readOnly={true}
                >
                    <div className="flex flex-row items-center px-3">
                        <Location />
                    </div>
                </Input>
            </div>
            {locationModalOpen && (
                <LocationModal
                    currentLatitude={currentLatitude}
                    currentLongitude={currentLongitude}
                    handleLocationModalOpen={handleLocationModalOpen}
                    regionRange={regionRange}
                    onRegionRangeChange={onRegionRangeChange}
                    onRegionChange={onRegionChange}
                />
            )}
        </>
    )
}
