'use client'
import { DeleteLike } from '@/api/board/deleteLike'
import { GetLike } from '@/api/board/getLike'
import { PostLike } from '@/api/board/postLike'
import BoardLike from '@/components/images/BoardLike'
import BoardComment from '@/components/images/BoardCommet'
import BoardUnLike from '@/components/images/BoardUnLike'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BoardLikeAndComment({
    boardId,
    likeCount,
    commentCount,
}: {
    boardId: string
    likeCount: number
    commentCount: number
}) {
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {
        const fetchLike = async () => {
            const getLike = await GetLike(boardId)
            setLike(getLike.data.isLiked)
        }
        fetchLike()
    }, [boardId])

    const handleLike = async () => {
        let result
        if (like == false) {
            result = await PostLike(boardId)
            if (result && result.isSuccess === true) {
                setLike(true)
            }
        } else if (like == true) {
            result = await DeleteLike(boardId)
            if (result && result.isSuccess === true) {
                setLike(false)
            }
        }
        if (!result || result.isSuccess !== true) {
            console.error('좋아요 상태 변경 실패')
        }
    }

    return (
        <section className="border-t-[1px]">
            <div className="flex space-x-5 mt-2">
                <button className="flex justify-center items-center" onClick={handleLike}>
                    {like ? (
                        <div className=" w-5 h-5 mr-1">
                            <BoardLike />
                        </div>
                    ) : (
                        <div className=" w-7 h-7 mr-1">
                            <BoardUnLike />
                        </div>
                    )}
                    <p className="flex ">{likeCount}</p>
                </button>
                <Link href={`/board/${boardId}`} passHref scroll={false}>
                    <button className="flex justify-center items-center">
                        <div className=" w-5 h-5 mr-1">
                            <BoardComment />
                        </div>
                        <p>{commentCount}</p>
                    </button>
                </Link>
            </div>
        </section>
    )
}
