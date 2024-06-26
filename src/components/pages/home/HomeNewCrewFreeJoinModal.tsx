'use client'

import { useRouter } from 'next/navigation'

import postFreeJoin from '@/api/crew/postFreeJoin'
import SliderModal from '@/components/common/SliderModal'

export default function HomeNewCrewFreeJoinModal({
    crewId,
    crewName,
    isModalOpen,
    modalController,
}: {
    crewId: number
    crewName: string
    isModalOpen: boolean
    modalController: () => void
}) {
    const router = useRouter()

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
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true} bottom={80}>
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
