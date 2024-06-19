'use client'

import { useState } from 'react'
import RegionModifyModal from './RegionModifyModal'
import Alert from '@/components/common/Alert'
import getRegion from '@/api/crew/getRegion'

interface regionType {
    addressName: string
    latitude: number
    longitude: number
    currentSelectedRange: number
}

export default function RegionModify({ regionId }: { regionId: number }) {
    const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<'question' | 'info' | 'error' | 'success' | 'warning'>('success')
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [prevRegionData, setPrevRegionData] = useState<regionType>({
        addressName: '',
        latitude: 0,
        longitude: 0,
        currentSelectedRange: 0,
    })

    const handleLocationModalOpen = () => {
        setLocationModalOpen(!locationModalOpen)
        getPrevRegionData()
    }

    const handleAlertOpen = (message: string, status: string) => {
        console.log('message', message)
        console.log('status', status)
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
    }

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
                    handleLocationModalOpen={handleLocationModalOpen}
                    handleAlertOpen={handleAlertOpen}
                    prevRegionId={regionId}
                    prevRegionData={prevRegionData}
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
