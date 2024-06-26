'use client'
import { GetBoardComment } from '@/api/board/boardcomment'
import LoadingMark from '@/components/images/LoadingMark'
import MoreInfo from '@/components/images/MoreInfo'
import { useState, useTransition } from 'react'
import CommentSetting from './CommentSetting'

interface CommentListType {
    commentId: string
    writerUuid: string
    content: string
    isInCrew: boolean
    createdAt: string
}

function BoardComment({ boardId, data, lastPage }: { boardId: string; data: CommentListType[]; lastPage: boolean }) {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [CommentList, setCommentList] = useState<CommentListType[]>(data)
    const [isLast, setIsLast] = useState<boolean>(lastPage)
    const [isPending, startTransition] = useTransition()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleLoadMore = () => {
        startTransition(async () => {
            try {
                const newComments = await GetBoardComment(boardId, currentPage + 1)
                {
                    console.log('newComments', newComments)
                    setCommentList((prev) => [...newComments.commentList, ...prev])
                    setCurrentPage((prev) => prev + 1)
                    setIsLast(newComments.isLast)
                }
            } catch (error) {
                console.error('댓글을 불러오는데 실패했습니다:', error)
            }
        })
    }
    const modalController = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <section className="space-y-3 ">
            {isPending && (
                <div className="flex justify-center my-4">
                    <LoadingMark />
                </div>
            )}
            {!isLast ? (
                <div className=" my-4 text-gray-500">
                    <button type="button" onClick={handleLoadMore} disabled={isPending}>
                        댓글 더보기
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            {CommentList.map((comment, idx) => (
                <div key={idx} className=" space-y-2 ">
                    <div className="flex items-center mt-2 justify-between">
                        <div className="flex">
                            <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center text-sm"></div>
                            <div className="ml-3 ">
                                <p className="">작성자</p>
                            </div>
                        </div>
                        <button className="w-3 rotate-90" onClick={modalController}>
                            <MoreInfo />
                        </button>
                    </div>

                    <p>{comment.content}</p>
                    <p className="text-sm">
                        {new Date(comment.createdAt).toLocaleTimeString('ko-KR', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    <CommentSetting
                        isModalOpen={isModalOpen}
                        modalController={modalController}
                        commentId={comment.commentId}
                    />
                </div>
            ))}
        </section>
    )
}

export default BoardComment
