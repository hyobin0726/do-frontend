'use client'

import { useState, useEffect } from 'react'
import RegionModifyModal from './RegionModifyModal'
import Alert from '@/components/common/Alert'
import getRegion from '@/api/crew/getRegion'
import { getKakaoMapInfo } from '@/api/getKakaoMapInfo'

interface RegionType {
    addressName: string
    latitude: number
    longitude: number
    currentSelectedRange: number
}

interface RegionModifyProps {
    regionId: number
    currentLatitude: number
    currentLongitude: number
}

export default function RegionModify({ regionId, currentLatitude, currentLongitude }: RegionModifyProps) {
    const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<'question' | 'info' | 'error' | 'success' | 'warning'>('success')
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [prevRegionData, setPrevRegionData] = useState<RegionType>({
        addressName: '',
        latitude: 0,
        longitude: 0,
        currentSelectedRange: 0,
    })
    const [isSameRegion, setIsSameRegion] = useState<boolean>(false)

    const handleLocationModalOpen = () => {
        setLocationModalOpen(!locationModalOpen)
    }

    const handleAlertOpen = (message: string, status: string) => {
        if (status === 'REGION404') {
            setAlertMessage('이미 추가된 지역입니다.')
            setAlertType('warning')
        } else if (status === '200') {
            setAlertMessage('활동지역이 수정되었습니다.')
            setAlertType('success')
        }
        setIsAlertOpen(true)
    }

    const getPrevRegionData = async () => {
        const prevRegionData = await getRegion({ regionId })
        setPrevRegionData(prevRegionData)
        return prevRegionData
    }

    const fetchLocationLegalCode = async () => {
        const locationData = await getKakaoMapInfo(currentLatitude, currentLongitude)
        if (!locationData) {
            return
        }
        const currentRegionName = locationData.region_2depth_name + ' ' + locationData.region_3depth_name
        return currentRegionName
    }

    useEffect(() => {
        const fetchData = async () => {
            const prevRegionData = await getPrevRegionData()
            const currentRegionName = await fetchLocationLegalCode()
            if (prevRegionData.addressName === currentRegionName) {
                setIsSameRegion(true)
            }
        }

        fetchData()
    }, [currentLatitude, currentLongitude, locationModalOpen])

    return (
        <>
            <div
                onClick={handleLocationModalOpen}
                className="w-[20%] h-[40px] bg-white border-[1px] border-hobbing-red rounded-xl flex justify-center items-center"
            >
                <p className="font-Pretendard text-hobbing-red text-[13px] font-bold">수정</p>
            </div>
            {locationModalOpen && (
                <RegionModifyModal
                    currentLatitude={currentLatitude}
                    currentLongitude={currentLongitude}
                    handleLocationModalOpen={handleLocationModalOpen}
                    handleAlertOpen={handleAlertOpen}
                    prevRegionId={regionId}
                    prevRegionDataRange={isSameRegion ? prevRegionData.currentSelectedRange : 3}
                    prevRegionName={prevRegionData.addressName}
                />
            )}
            {isAlertOpen && (
                <Alert type={alertType} isAlertOpen={isAlertOpen}>
                    <div>
                        {alertType === 'success' ? (
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {alertMessage}
                            </p>
                        ) : (
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {alertMessage}
                                <br />
                                다시 시도해주세요.
                            </p>
                        )}
                    </div>
                    <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                        <button
                            onClick={() => {
                                setIsAlertOpen(false)
                            }}
                            className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                        >
                            닫기
                        </button>
                    </div>
                </Alert>
            )}
        </>
    )
}
