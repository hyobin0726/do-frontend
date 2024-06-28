import { deleteComment } from '@/api/board/deleteComment'
import SliderModal from '@/components/common/SliderModal'
import Delete from '@/components/images/Delete'

export default function CommentSetting({
    isModalOpen,
    modalController,
    commentId,
    onDeleteComment,
}: {
    isModalOpen: boolean
    modalController: () => void
    commentId: string
    onDeleteComment: (commentId: string) => void
}) {
    const handleDelete = async () => {
        try {
            await deleteComment(commentId)
            onDeleteComment(commentId)
            modalController()
        } catch (error) {
            console.error('댓글 삭제에 실패했습니다:', error)
        }
    }

    return (
        <div className="flex items-end justify-center bg-white">
            <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true} bottom={true}>
                <div className="w-full bg-white h-14">
                    <div className="w-full h-auto flex flex-col items-center space-y-3">
                        <div
                            className="w-full h-auto flex justify-center items-center py-2 border-b border-gray-300 space-x-2"
                            onClick={handleDelete}
                        >
                            <div className="w-5 h-5">
                                <Delete />
                            </div>
                            <p className="text-[18px] text-center text-gray-600">삭제</p>
                        </div>
                        <div className="w-full h-auto flex justify-center items-center " onClick={modalController}>
                            <p className="text-[18px] text-center text-hobbing-red">닫기</p>
                        </div>
                    </div>
                </div>
            </SliderModal>
        </div>
    )
}
