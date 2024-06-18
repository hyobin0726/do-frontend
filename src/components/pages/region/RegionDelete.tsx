'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useGetClientToken } from '@/actions/useGetClientToken'
import getBaseRegion from '@/api/crew/getBaseRegion'
import Alert from '@/components/common/Alert'

export default function RegionDelete({ regionId }: { regionId: number }) {
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const router = useRouter()

    const auth = useGetClientToken()
    const handleRegionDelete = async () => {
        const baseRegionData = await getBaseRegion()
        if (baseRegionData === regionId) {
            setIsAlertOpen(true)
            setAlertMessage('기본 주소지는 삭제할 수 없습니다.')
            return
        }
        const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/${regionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${auth.token}`,
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data.isSuccess) {
            router.refresh()
        }
    }

    return (
        <>
            <button
                onClick={handleRegionDelete}
                className="w-[20%] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
            >
                <p className="font-Pretendard text-white text-[13px] font-bold">삭제</p>
            </button>
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
