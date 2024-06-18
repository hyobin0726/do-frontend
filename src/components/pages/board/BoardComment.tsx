'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CommentListType {
    commentId: string
    writerUuid: string
    content: string
    isInCrew: boolean
    createdAt: string
}

function BoardComment() {
    const auth = useGetClientToken()
    const params = useParams<{ boardId: string }>()
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [CommentList, setCommentList] = useState<CommentListType[]>([])
    const [isLast, setIsLast] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const GetBoardList = async () => {
            setIsLoading(true)
            try {
                const data = await fetch(
                    `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${params.boardId}/comment-list?page=${currentPage}&size=2`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Uuid: `${auth.token}`,
                        },
                    },
                )
                const response = await data.json()
                if (response.isSuccess) {
                    if (currentPage === 0) {
                        setCommentList(response.data.commentList)
                        console.log('response.data.commentList', response.data.commentList)
                    } else {
                        setCommentList((prev) => [...response.data.commentList, ...prev])
                    }
                    setIsLast(response.data.isLast)
                } else {
                    console.error('댓글을 불러오는데 실패했습니다.')
                }
            } catch (error) {
                console.error('댓글을 불러오는데 실패했습니다.', error)
            }
            setIsLoading(false)
        }
        GetBoardList()
    }, [currentPage])

    const handleLoadMore = () => {
        setCurrentPage((prev) => prev + 1)
    }

    return (
        <section className="space-y-3 ">
            {isLoading && (
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
                    <button type="button" onClick={handleLoadMore} disabled={isLoading}>
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
