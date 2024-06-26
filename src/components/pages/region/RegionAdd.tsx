'use client'

import { useState } from 'react'

import Add from '@/components/images/Add'
import RegionAddModal from './RegionAddModal'
import Alert from '@/components/common/Alert'

export default function RegionAdd({
    currentLatitude,
    currentLongitude,
}: {
    currentLatitude: number
    currentLongitude: number
}) {
    const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const handleAlertOpen = (message: string, status: string) => {
        if (status === 'REGION404') {
            setAlertMessage('이미 추가된 지역입니다.')
        } else {
            setAlertMessage(message)
        }
        setIsAlertOpen(true)
    }

    const handleLocationModalOpen = () => {
        setLocationModalOpen(!locationModalOpen)
    }

    return (
        <>
            <button
                onClick={handleLocationModalOpen}
                className="bg-white h-[50px] w-1/2 flex flex-row justify-center space-x-2 items-center mt-5"
            >
                <Add />
                <p className="font-Pretendard text-hobbing-red text-[15px] font-bold underline">지역 추가하기</p>
            </button>
            {locationModalOpen && (
                <RegionAddModal
                    currentLatitude={currentLatitude}
                    currentLongitude={currentLongitude}
                    handleLocationModalOpen={handleLocationModalOpen}
                    handleAlertOpen={handleAlertOpen}
                />
            )}
            {isAlertOpen && (
                <Alert type="warning" isAlertOpen={isAlertOpen}>
                    <div>
                        <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                            {alertMessage}
                            <br />
                            다시 시도해주세요.
                        </p>
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
