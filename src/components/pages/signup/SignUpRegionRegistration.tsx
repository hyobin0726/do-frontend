'use client'

import { useState } from 'react'

import ProgressBar from '@/components/common/ProgressBar'
import { useSignUpStore } from '@/hooks/useSignUpStore'
import RegionAddInput from '../region/RegionAddInput'
import { KakaoMapRange } from '@/lib/KakaoMapRange'
import SignupButton from './SignupButton'

export default function SignUpRegionRegistration() {
    const [regionName, setRegionName] = useState<string>('')
    const [regionCode, setRegionCode] = useState<number>(0)
    const [regionLatitude, setRegionLatitude] = useState<number>(0)
    const [regionLongitude, setRegionLongitude] = useState<number>(0)
    const [regionRange, setRegionRange] = useState<number>(KakaoMapRange[0].id)

    const { name, id, password, email, phoneNumber, gender, birthDate } = useSignUpStore()

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
                {/* <SignupButton
                    name={name}
                    id={id}
                    password={password}
                    phoneNumber={phoneNumber}
                    email={email}
                    gender={gender}
                    birthDate={birthDate}
                    regionName={regionName}
                    regionCode={regionCode}
                    regionLatitude={regionLatitude}
                    regionLongitude={regionLongitude}
                    regionRange={regionRange}
                /> */}
                <div className="w-5/6 h-auto">
                    <ProgressBar step={3} total={5} />
                </div>
            </div>
        </div>
    )
}
