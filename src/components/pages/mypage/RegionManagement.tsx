'use client'

import React, { useState, useEffect } from 'react'

import RightArrow from '@/components/images/RightArrow'
import RegionDelete from '../region/RegionDelete'
import RegionModify from '../region/RegionModify'
import RegionAdd from '../region/RegionAdd'
import Link from 'next/link'

import Location from '@/components/images/Location'
// import getCurrentPos from '@/actions/getCurrentPos'

interface RegionManagementProps {
    data: regionData[]
}

interface regionData {
    regionId: number
    addressName: string
}

interface positionType {
    latitude: number
    longitude: number
}

export default function RegionManagement({ data }: RegionManagementProps) {
    const [position, setPosition] = useState<positionType>({ latitude: 0, longitude: 0 })

    useEffect(() => {
        const getCurrentPos = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        setPosition({
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                        })
                    },
                    () => alert('위치 정보를 가져오는데 실패했습니다.'),
                    {
                        enableHighAccuracy: true,
                        maximumAge: 30000,
                        timeout: 27000,
                    },
                )
            } else {
                alert('Geolocation is not supported by this browser.')
            }
        }
        getCurrentPos()
    }, [])

    return (
        <main className="w-full" style={{ height: 'calc(100svh - 60px)' }}>
            <section className="w-full h-[30%] flex flex-col justify-end pb-5 px-10 space-y-3">
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                    활동 지역을
                    <br />
                    추가해보세요!
                </p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    내 활동 지역은 최대 3개까지 등록할 수 있습니다.
                    <br />
                    기본 활동지역을 삭제하시려면 홈에서 변경 후 삭제해주세요.
                </p>
            </section>
            <section className="w-full h-[40%] px-10 flex flex-col items-center">
                {data.map((region) => (
                    <div key={region.regionId} className=" w-full flex flex-row justify-between  items-center my-3">
                        <div className="w-[55%] h-[40px] bg-white flex flex-row items-center border-b-[1px] border-hobbing-red">
                            <div className="flex flex-row items-center px-3">
                                <Location />
                            </div>
                            {region.addressName}
                        </div>
                        <RegionModify
                            currentLatitude={position.latitude}
                            currentLongitude={position.longitude}
                            regionId={region.regionId}
                        />
                        <RegionDelete regionId={region.regionId} />
                    </div>
                ))}
                {data.length < 3 && (
                    <RegionAdd currentLatitude={position.latitude} currentLongitude={position.longitude} />
                )}
            </section>
            <section className="w-full h-[25%] px-10 flex flex-col justify-center items-center">
                <Link
                    href={'/mypage'}
                    className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                >
                    <p className="font-Pretendard text-white text-[15px] font-bold">확인</p>
                    <RightArrow width={15} height={15} />
                </Link>
            </section>
        </main>
    )
}
