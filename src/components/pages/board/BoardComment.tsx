'use client'
import { GetBoardComment } from '@/api/board/boardcomment'
import LoadingMark from '@/components/images/LoadingMark'
import MoreInfo from '@/components/images/MoreInfo'
import { useState } from 'react'
import CommentSetting from './CommentSetting'

interface CommentListType {
    commentId: string
    writerUuid: string
    writerName: string
    writerProfileImageUrl: string
    content: string
    isInCrew: boolean
    createdAt: string
}

function BoardComment({ boardId, data, lastPage }: { boardId: string; data: CommentListType[]; lastPage: boolean }) {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [CommentList, setCommentList] = useState<CommentListType[]>(data)
    const [isLast, setIsLast] = useState<boolean>(lastPage)
    const [loading, setLoading] = useState<boolean>(false)
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null)

    const handleLoadMore = async () => {
        setLoading(true) // 로딩 시작
        try {
            const newComments = await GetBoardComment(boardId, currentPage + 1)
            setCommentList((prev) => [...newComments.commentList, ...prev])
            setCurrentPage((prev) => prev + 1)
            setIsLast(newComments.isLast)
        } catch (error) {
            console.error('댓글을 불러오는데 실패했습니다:', error)
        } finally {
            setLoading(false)
        }
    }
    const modalController = (commentId: string) => {
        setActiveCommentId((prev) => (prev === commentId ? null : commentId))
    }
    const handleDeleteComment = (commentId: string) => {
        setCommentList((prev) => prev.filter((comment) => comment.commentId !== commentId))
    }

    return (
        <section className="space-y-3 ">
            {loading && (
                <div className="flex justify-center my-4">
                    <LoadingMark />
                </div>
            )}
            {!isLast && !loading && (
                <div className="my-4 text-gray-500">
                    <button type="button" onClick={handleLoadMore} disabled={loading}>
                        댓글 더보기
                    </button>
                </div>
            )}

            {CommentList.map((comment, idx) => (
                <div key={idx} className="space-y-2 border-b-[0.5px]">
                    <div className="flex items-center mt-2 justify-between">
                        <div className="flex items-center">
                            <img src={comment.writerProfileImageUrl} className="rounded-xl w-10 h-10" />
                            <div className="ml-3">
                                <p className="font-medium">{comment.writerName}</p>
                                <p className="text-sm">
                                    {new Date(comment.createdAt).toLocaleTimeString('ko-KR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                        <button className="w-3 rotate-90" onClick={() => modalController(comment.commentId)}>
                            <MoreInfo />
                        </button>
                    </div>
                    <p className="m-2">{comment.content}</p>
                    {activeCommentId === comment.commentId && (
                        <CommentSetting
                            isModalOpen={true}
                            modalController={() => modalController(comment.commentId)}
                            commentId={comment.commentId}
                            onDeleteComment={handleDeleteComment}
                        />
                    )}
                </div>
            ))}
        </section>
    )
}

export default BoardComment
