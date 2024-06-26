import { deleteBoard } from '@/api/board/deleteBoard'
import SliderModal from '@/components/common/SliderModal'
import Delete from '@/components/images/Delete'
import Modify from '@/components/images/Modify'
import Pin from '@/components/images/pin'
import { redirect } from 'next/dist/server/api-utils'
import { date } from 'zod'

export default function BoardSetting({
    isModalOpen,
    modalController,
    boardId,
}: {
    isModalOpen: boolean
    modalController: () => void
    boardId: string
}) {
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
                    <div className="w-full h-auto flex flex-col items-center pt-3 pb-3 space-y-3">
                        <div className="w-full h-auto flex justify-center items-center py-2 border-b border-gray-300 space-x-2">
                            <div className="w-5 h-5">
                                <Pin />
                            </div>
                            <p className="text-[18px] text-center text-gray-600">고정</p>
                        </div>
                        <div className="w-full h-auto flex justify-center items-center py-2 border-b border-gray-300 space-x-2">
                            <Modify />

                            <p className="text-[18px] text-center text-gray-600  ">수정</p>
                        </div>
                        <div
                            className="w-full h-auto flex justify-center items-center py-2 border-b border-gray-300 space-x-2"
                            onClick={handlerdelete}
                        >
                            <div className="w-5 h-5">
                                <Delete />
                            </div>
                            <p className="text-[18px] text-center text-gray-600">삭제</p>
                        </div>
                        <div className="w-full h-auto flex justify-center items-center py-2" onClick={modalController}>
                            <p className="text-[18px] text-center text-hobbing-red">닫기</p>
                        </div>
                    </div>
                </div>
            </SliderModal>
        </div>
    )
}
