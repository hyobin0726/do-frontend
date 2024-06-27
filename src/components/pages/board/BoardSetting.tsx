'use client'
import { deleteBoard } from '@/api/board/deleteBoard'
import { deleteBoardPin } from '@/api/board/deleteBoardPin'
import { postBoardPin } from '@/api/board/postBoardPin'
import SliderModal from '@/components/common/SliderModal'
import Delete from '@/components/images/Delete'
import Modify from '@/components/images/Modify'
import Pin from '@/components/images/pin'
import { useRouter } from 'next/navigation'

export default function BoardSetting({
    isModalOpen,
    modalController,
    boardId,
    boardPin,
}: {
    isModalOpen: boolean
    modalController: () => void
    boardId: string
    boardPin: boolean
}) {
    const router = useRouter()

    const handlepin = async () => {
        let result
        if (boardPin == false) {
            result = await postBoardPin(boardId)
            if (result && result.isSuccess === true) {
                modalController()
            }
        } else if (boardPin == true) {
            result = await deleteBoardPin(boardId)
            if (result && result.isSuccess === true) {
                modalController()
            }
        }
    }

    const handleModify = () => {
        router.push(`/boardwriting/${boardId}`)
    }

    const handlerdelete = async () => {
        try {
            await deleteBoard(boardId)
            modalController()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="z-[950] fixed flex items-end justify-center ">
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true} bottom={true}>
                <div className="w-full bg-white  ">
                    <div className="w-full h-auto flex flex-col items-center pt-3 pb-3 space-y-3 ">
                        <div
                            className="w-full h-auto flex justify-center items-center py-2 border-b border-gray-300 space-x-2"
                            onClick={handlepin}
                        >
                            <div className="w-5 h-5">
                                <Pin />
                            </div>
                            <p className="text-[18px] text-center text-gray-600">고정</p>
                        </div>
                        <div
                            className="w-full  flex justify-center items-center py-2 border-b border-gray-300 space-x-2"
                            onClick={handleModify}
                        >
                            <Modify />
                            <p className="text-[18px] text-center text-gray-600">수정</p>
                        </div>
                        <div
                            className="w-full  flex justify-center items-center py-2 border-b border-gray-300 space-x-2"
                            onClick={handlerdelete}
                        >
                            <div className="w-5 h-5">
                                <Delete />
                            </div>
                            <p className="text-[18px] text-center text-gray-600">삭제</p>
                        </div>
                        <div className="w-full flex justify-center items-center" onClick={modalController}>
                            <p className="text-[18px] text-center text-hobbing-red">닫기</p>
                        </div>
                    </div>
                </div>
            </SliderModal>
        </div>
    )
}
