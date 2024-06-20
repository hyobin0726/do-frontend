'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { KakaoMapRange } from '@/lib/KakaoMapRange'
import Close from '@/components/images/Close'
import KakaoMap from './KakaoMap'

export default function RegionAddModal({
    currentLatitude,
    currentLongitude,
    handleLocationModalOpen,
    handleAlertOpen,
}: {
    currentLatitude: number
    currentLongitude: number
    handleLocationModalOpen: () => void
    handleAlertOpen: (message: string, status: string) => void
}) {
    const [regionName, setRegionName] = useState<string>('')
    const [regionCode, setRegionCode] = useState<number>(0)
    const [regionLongitude, setRegionLongitude] = useState<number>(0)
    const [regionLatitude, setRegionLatitude] = useState<number>(0)
    const [regionRange, setRegionRange] = useState<number>(KakaoMapRange[0].selectRange)
    const [regionCircleRange, setRegionCircleRange] = useState<number>(3000)

    const auth = useGetClientToken()
    const router = useRouter()

    const onRegionChange = (
        regionName: string,
        regionCode: number,
        regionLatitude: number,
        regionLongitude: number,
    ) => {
        setRegionName(regionName)
        setRegionCode(regionCode)
        setRegionLatitude(regionLatitude)
        setRegionLongitude(regionLongitude)
    }

    const onRegionAdd = async () => {
        const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region`, {
            method: 'POST',
            headers: {
                Authorization: `${auth.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                addressName: regionName,
                legalCode: regionCode,
                latitude: regionLatitude,
                longitude: regionLongitude,
                currentSelectedRange: regionRange,
            }),
        })
        const data = await res.json()
        console.log(data)
        if (data.isSuccess) {
            handleLocationModalOpen()
            router.refresh()
        } else {
            handleAlertOpen(data.message, data.status)
            handleLocationModalOpen()
        }
    }

    return (
        <>
            <div className="bg-red-300 fixed top-0 left-0 w-dvw h-svh z-[500]">
                <div className="relative w-full h-[60px] flex items-center px-5 bg-white drop-shadow-sm">
                    <Close
                        onClick={handleLocationModalOpen}
                        className="absolute left-5 h-[60px] w-[50px] flex items-center"
                    />
                    <p className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                        활동지역 추가
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
                                            setRegionRange(range.selectRange)
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
                            onClick={onRegionAdd}
                            className="w-full h-1/3 bg-hobbing-red flex flex-col justify-center items-center space-y-1"
                        >
                            <p className="text-[15px] font-bold underline text-white">{regionName}</p>
                            <p className="text-[15px]  text-white">활동지역에 추가하기</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
