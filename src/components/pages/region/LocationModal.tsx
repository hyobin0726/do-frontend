'use client'

import { useState } from 'react'

import { KakaoMapRange } from '@/lib/KakaoMapRange'
import Close from '@/components/images/Close'
import KakaoMap from './KakaoMap'

interface LocationModalProps {
    currentLatitude: number
    currentLongitude: number
    handleLocationModalOpen: () => void
    regionRange: number
    onRegionRangeChange: (range: number) => void
    onRegionChange: (regionName: string, regionCode: number, regionLatitude: number, regionLongitude: number) => void
}

export default function LocationModal({
    currentLatitude,
    currentLongitude,
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
                    <div className="absolute top-0 w-full h-[80%]">
                        <KakaoMap
                            currentLatitude={currentLatitude}
                            currentLongitude={currentLongitude}
                            selectedRange={regionCircleRange}
                            onRegionChange={onRegionChange}
                        />
                    </div>
                    <div className="absolute bottom-0 w-full h-[25%] z-[550] bg-white rounded-t-2xl flex flex-col justify-end items-center  drop-shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                        <div className="w-full h-1/2 flex space-y-5 flex-col justify-center    items-center">
                            <div className="bg-hobbing-bg-pink  w-[80%] h-[5px] rounded-full flex flex-row justify-between items-center  ">
                                {KakaoMapRange.map((range) => (
                                    <div
                                        key={range.id}
                                        onClick={() => {
                                            onRegionRangeChange(range.selectRange)
                                            setRegionCircleRange(range.range)
                                        }}
                                        className={`rounded-full flex justify-center items-center ${
                                            regionRange === range.selectRange
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
                        <button
                            onClick={handleLocationModalOpen}
                            className="w-full h-1/3 bg-hobbing-red flex justify-center items-center"
                        >
                            <p className="text-[13px] text-white">
                                활동지역을 등록해 내 주변 추천 취미 소모임을 확인해보세요!
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
