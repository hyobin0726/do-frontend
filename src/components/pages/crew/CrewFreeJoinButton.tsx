'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import RightArrow from '@/components/images/RightArrow'
import postFreeJoin from '@/api/crew/postFreeJoin'
import Alert from '@/components/common/Alert'

export default function CrewFreeJoinButton({ crewId }: { crewId: number }) {
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<'loading' | 'success' | 'error'>('loading')
    const [alertMessage, setAlertMessage] = useState<string>('')
    const router = useRouter()

    const handleFreeJoin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsAlertOpen(true)
        const res = await postFreeJoin(crewId)

        if (res.isSuccess) {
            setAlertType('success')
            setAlertMessage('가입이 완료되었습니다. 채팅방으로 이동합니다.')
        } else {
            setAlertType('error')
            setAlertMessage('가입에 실패했습니다. 다시 시도해주세요')
        }
    }

    return (
        <>
            <form onSubmit={handleFreeJoin}>
                <button
                    type="submit"
                    className="h-[40px] w-full rounded-xl flex flex-row justify-between items-center px-5 my-4 bg-hobbing-red"
                >
                    <p className="text-white text-[13px]">가입하기</p>
                    <RightArrow />
                </button>
            </form>
            {isAlertOpen && (
                <Alert type={alertType} isAlertOpen={isAlertOpen} background={true}>
                    <span className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                        {alertMessage}
                    </span>
                    <button
                        onClick={() => {
                            setIsAlertOpen(false)
                            if (alertType === 'success') {
                                router.push(`/chat`)
                            }
                        }}
                        className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    >
                        확인
                    </button>
                </Alert>
            )}
        </>
    )
}
