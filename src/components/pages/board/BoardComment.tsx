'use client'
import { GetBoardComment } from '@/api/board/boardcomment'
import { useState, useTransition } from 'react'

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
    return (
        <section className="space-y-3 ">
            {isPending && (
                <div className="flex justify-center my-4">
                    <svg
                        className="animate-spin h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
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
                    <div className="flex items-center mt-2 ">
                        <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center text-sm"></div>
                        <div className="ml-3 ">
                            <p className="">작성자</p>
                        </div>
                    </div>

                    <p>{comment.content}</p>
                    <p className="text-sm">{comment.createdAt}</p>
                </div>
            ))}
        </section>
    )
}

export default BoardComment
