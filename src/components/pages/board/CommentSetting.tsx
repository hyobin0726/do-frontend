import { deleteComment } from '@/api/board/deleteComment'
import SliderModal from '@/components/common/SliderModal'
import Delete from '@/components/images/Delete'
import { useParams, useRouter } from 'next/navigation'

export default function CommentSetting({
    isModalOpen,
    modalController,
    commentId,
}: {
    isModalOpen: boolean
    modalController: () => void
    commentId: string
}) {
    const params = useParams()
    const router = useRouter()
    console.log('params', params)
    const handlerdelete = async () => {
        try {
            await deleteComment(commentId)
            modalController()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-end justify-center ">
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true} bottom={true}>
                <div className="w-full bg-white  ">
                    <div className="w-full h-auto flex flex-col items-center pt-3 pb-3 space-y-3">
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
