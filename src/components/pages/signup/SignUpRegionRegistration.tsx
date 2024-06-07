'use client'

import { useState, useEffect } from 'react'

import RightArrow from '@/components/images/RightArrow'
import ProgressBar from '@/components/common/ProgressBar'
import RegionAddInput from '../region/RegionAddInput'
import { KakaoMapRange } from '@/lib/KakaoMapRange'

export default function SignUpRegionRegistration() {
    const [regionName, setRegionName] = useState<string>('')
    const [regionCode, setRegionCode] = useState<number>(0)
    const [regionLatitude, setRegionLatitude] = useState<number>(0)
    const [regionLongitude, setRegionLongitude] = useState<number>(0)
    const [regionRange, setRegionRange] = useState<number>(KakaoMapRange[0].id)

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

    const onRegionRangeChange = (range: number) => {
        setRegionRange(range)
    }

    useEffect(() => {
        console.log('regionName: ', regionName)
        console.log('regionCode: ', regionCode)
        console.log('regionLatitude: ', regionLatitude)
        console.log('regionLongitude: ', regionLongitude)
        console.log('regionRange: ', regionRange)
    }, [regionName, regionCode, regionLatitude, regionLongitude, regionRange])

    return (
        <div className="w-full" style={{ height: 'calc(100svh - 60px)' }}>
            <div className="w-full h-[25%] flex flex-col justify-end pb-5 px-10 space-y-3">
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                    활동하려는 지역을
                    <br />
                    추가해보세요!
                </p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    내 활동 지역은 마이페이지에서 추가 또는 변경할 수 있습니다.
                </p>
            </div>
            <div className="w-full h-[50%] flex flex-col pt-5 px-10">
                <RegionAddInput
                    title="활동지역"
                    required={true}
                    id="region"
                    name="region"
                    value={regionName}
                    regionRange={regionRange}
                    onRegionChange={onRegionChange}
                    onRegionRangeChange={onRegionRangeChange}
                />
            </div>
            <div className="w-full h-[25%] px-10 flex flex-col justify-around items-center">
                <form
                    // onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 w-full h-auto"
                >
                    <button
                        type="submit"
                        className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                    >
                        <p className="font-Pretendard text-white text-[15px] font-bold">NEXT</p>
                        <RightArrow width={15} height={15} />
                    </button>
                </form>
                <div className="w-5/6 h-auto">
                    <ProgressBar step={3} total={5} />
                </div>
            </div>
        </div>
    )
}
