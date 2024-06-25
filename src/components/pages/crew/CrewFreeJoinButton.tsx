'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import RightArrow from '@/components/images/RightArrow'
import postFreeJoin from '@/api/crew/postFreeJoin'
import SliderModal from '@/components/common/SliderModal'

export default function CrewFreeJoinButton({ crewId, crewName }: { crewId: number; crewName: string }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const router = useRouter()

    const modalController = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleFreeJoin = async () => {
        const res = await postFreeJoin(crewId)

        if (res.isSuccess) {
            modalController()
            router.push(`/chat`)
        } else {
            alert('가입에 실패했습니다. 다시 시도해주세요')
        }
    }

    return (
        <>
            <button
                onClick={modalController}
                className="h-[50px] w-full rounded-xl flex flex-row justify-between items-center px-5 bg-hobbing-red"
            >
                <p className="text-white text-[13px]">바로 가입하기</p>
                <RightArrow />
            </button>
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true}>
                <div className="w-full h-auto flex justify-center items-center pt-3">
                    <p className=" text-[20px] text-center">
                        <span className="font-bold ">{crewName}</span>에 <br />
                        가입하시겠습니까?
                    </p>
                </div>
                <div className="w-full h-auto flex flex-row justify-center space-x-4 pt-5">
                    <button
                        onClick={handleFreeJoin}
                        className="w-[80px] h-[45px] bg-hobbing-red rounded-xl font-Pretendard text-[14px] text-white font-medium px-4"
                    >
                        확인
                    </button>
                    <button
                        onClick={modalController}
                        className="w-[80px] h-[45px] bg-white border-[1px] border-hobbing-red text-hobbing-red rounded-xl font-Pretendard text-[14px] font-medium px-3"
                    >
                        닫기
                    </button>
                </div>
            </SliderModal>
        </>
    )
}
