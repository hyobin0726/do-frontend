'use client'

import { useState } from 'react'

import { KakaoMapRange } from '@/lib/KakaoMapRange'
import Close from '@/components/images/Close'
import KakaoMap from './KakaoMap'

interface LocationModalProps {
    handleLocationModalOpen: () => void
    regionRange: number
    onRegionRangeChange: (range: number) => void
    onRegionChange: (
        regionName: string,
        regionCode: number,
        regionLatitude: number,
        regionLongitude: number,
        regionRange: number,
    ) => void
}

export default function LocationModal({
    handleLocationModalOpen,
    regionRange,
    onRegionRangeChange,
    onRegionChange,
}: LocationModalProps) {
    const [regionCircleRange, setRegionCircleRange] = useState<number>(3000)

    return (
        <>
            <div className="bg-red-300 fixed top-0 left-0 w-dvw h-svh z-[500]">
                <div className="relative w-full h-[60px] flex items-center px-5 bg-white drop-shadow-sm">
                    <Close
                        onClick={handleLocationModalOpen}
                        className="absolute left-5 h-[60px] w-[50px] flex items-center"
                    />
                    <p className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                        활동지역 범위 설정
                    </p>
                </div>
                <div className="relative w-full h-[calc(100%-60px)]">
                    <div className="absolute top-0 w-full h-[75%]">
                        <KakaoMap selectedRange={regionCircleRange} onRegionChange={onRegionChange} />
                    </div>
                    <div className="absolute bottom-0 w-full h-[30%] z-[550] bg-white rounded-t-2xl flex flex-col justify-center items-center space-y-3">
                        <div className="bg-hobbing-bg-pink  w-[80%] h-[5px] rounded-full flex flex-row justify-between items-center  ">
                            {KakaoMapRange.map((range) => (
                                <div
                                    key={range.id}
                                    onClick={() => {
                                        onRegionRangeChange(range.id)
                                        setRegionCircleRange(range.range)
                                    }}
                                    className={`rounded-full flex justify-center items-center ${
                                        regionRange === range.id
                                            ? 'w-[15px] h-[15px] bg-hobbing-red drop-shadow-md'
                                            : 'w-[13px] h-[13px] bg-hobbing-bg-pink'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="w-[85%] h-auto flex flex-row justify-between">
                            {KakaoMapRange.map((range) => (
                                <p
                                    key={range.id}
                                    className={`${range.id == 1 || range.id == 4 ? 'text-black' : 'text-transparent'} text-[12px] sm:text-[10px] md:text-[14px]`}
                                >
                                    {range.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
