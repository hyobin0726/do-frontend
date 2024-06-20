'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Alert from '@/components/common/Alert'
import RegionAddInput from './RegionAddInput'
import { KakaoMapRange } from '@/lib/KakaoMapRange'
import RightArrow from '@/components/images/RightArrow'
import { useGetClientToken } from '@/actions/useGetClientToken'

interface positionType {
    latitude: number
    longitude: number
}

export default function InitialRegionRegistration() {
    const [regionName, setRegionName] = useState<string>('')
    const [regionCode, setRegionCode] = useState<number>(0)
    const [regionLatitude, setRegionLatitude] = useState<number>(0)
    const [regionLongitude, setRegionLongitude] = useState<number>(0)
    const [regionRange, setRegionRange] = useState<number>(KakaoMapRange[0].selectRange)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<'question' | 'info' | 'error' | 'success' | 'warning'>('question')
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [position, setPosition] = useState<positionType>({ latitude: 0, longitude: 0 })

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

    const onRegionRangeChange = (range: number) => {
        setRegionRange(range)
    }

    const handleAlert = () => {
        setIsAlertOpen(!isAlertOpen)
    }

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

    const handleInitialRegion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/base`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${auth.token}`,
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
        setAlertMessage(data.isSuccess ? '최초 활동지역이 등록되었습니다!' : data.message)
        setAlertType(data.isSuccess ? 'success' : 'error')
        handleAlert()
    }

    const isFormValid = regionName !== '' && regionCode !== 0 && regionLatitude !== 0 && regionLongitude !== 0

    return (
        <>
            <main className="w-full" style={{ height: 'calc(100svh - 60px)' }}>
                <section className="w-full h-[25%] flex flex-col justify-end pb-5 px-10 space-y-3">
                    <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                        활동하려는 지역을
                        <br />
                        등록해보세요!
                    </p>
                    <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                        내 활동 지역은 마이페이지에서 추가 또는 변경할 수 있습니다.
                    </p>
                </section>
                <section className="w-full h-[50%] flex flex-col pt-5 px-10">
                    <RegionAddInput
                        currentLatitude={position.latitude}
                        currentLongitude={position.longitude}
                        title="활동지역"
                        required={true}
                        id="region"
                        name="region"
                        value={regionName}
                        regionRange={regionRange}
                        onRegionChange={onRegionChange}
                        onRegionRangeChange={onRegionRangeChange}
                    />
                </section>
                <section className="w-full h-[25%] px-10 flex flex-col justify-center items-center">
                    <form onSubmit={handleInitialRegion} className="w-full">
                        <button
                            disabled={!isFormValid}
                            type="submit"
                            className={`${!isFormValid ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
                        >
                            <p className="font-Pretendard text-white text-[15px] font-bold">활동지역 등록</p>
                            <RightArrow width={15} height={15} />
                        </button>
                    </form>
                </section>
            </main>
            {isAlertOpen && (
                <Alert type={alertType} isAlertOpen={isAlertOpen}>
                    {alertType === 'success' ? (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {alertMessage}
                                <br />
                                홈화면으로 이동합니다.
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        handleAlert()
                                        router.push('/')
                                    }}
                                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                >
                                    확인
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {alertMessage}
                                <br />
                                다시 시도해주세요.
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        handleAlert()
                                    }}
                                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                >
                                    확인
                                </button>
                            </div>
                        </>
                    )}
                </Alert>
            )}
        </>
    )
}
