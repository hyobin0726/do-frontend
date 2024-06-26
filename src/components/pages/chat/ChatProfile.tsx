'use client'
import { getOtherProfile } from '@/api/chat/getOtherProfile'
import { useEffect, useState } from 'react'
interface otherProfileType {
    profileImageUrl: string
    name: string
    profileMessage: string
    birth: string
    gender: string
}

export default function ChatProfile({
    isModalOpen,
    setIsModalOpen,
    otherUuid,
}: {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    otherUuid: string
}) {
    const [otherProfile, setOtherProfile] = useState<Partial<otherProfileType>>({
        profileImageUrl:
            'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1719328813438_Frame 1000004040.png',
        name: '(알 수 없음)',
        profileMessage: '',
        birth: '',
        gender: '',
    })
    useEffect(() => {
        const fetchOtherProfile = async () => {
            try {
                const response = await getOtherProfile(otherUuid)
                if (response.isSuccess) {
                    setOtherProfile(response.data)
                } else {
                    console.error('타 회원 프로필 조회 실패:', response.message)
                }
            } catch (error) {
                console.error('타 회원 프로필 조회 중 오류 발생:', error)
            }
        }

        if (isModalOpen && otherUuid) {
            fetchOtherProfile()
        }
    }, [isModalOpen, otherUuid])

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[500]">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl w-5/6 ">
                        <div className="relative pb-60">
                            <img
                                src={otherProfile?.profileImageUrl}
                                alt={otherProfile?.name}
                                className="absolute w-full h-full object-cover"
                            />
                            <button
                                onClick={closeModal}
                                className=" text-hobbing-red font-bold text-2xl absolute top-0 right-3"
                            >
                                X
                            </button>
                        </div>
                        <div className="px-6 py-8 space-y-3">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-2xl ">{otherProfile?.name}</h2>
                            </div>
                            <p className="text-sm text-gray-600">{otherProfile?.profileMessage}</p>
                            {otherUuid && (
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <p className="font-semibold">생일</p>
                                        <p>{otherProfile?.birth}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">성별</p>
                                        <p>{otherProfile?.gender}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
