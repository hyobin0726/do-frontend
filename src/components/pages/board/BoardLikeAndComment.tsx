'use client'
import { DeleteLike } from '@/api/board/deleteLike'
import { GetLike } from '@/api/board/getLike'
import { PostLike } from '@/api/board/postLike'
import BoardLike from '@/components/images/BoarLike'
import BoardComment from '@/components/images/BoardCommet'
import BoardUnLike from '@/components/images/BoardUnLike'
import { useEffect, useState } from 'react'

export default function BoardLikeAndComment({ boardId }: { boardId: string }) {
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {
        const fetchLike = async () => {
            const getLike = await GetLike(boardId)
            setLike(getLike.data.isLiked)
            // console.log('좋아요 상태', getLike.data.isLiked)
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
            <div className="flex space-x-4 mt-2">
                <button className="flex justify-center items-center" onClick={handleLike}>
                    {like ? (
                        <div className=" w-7 h-7 mr-1">
                            <BoardLike />
                        </div>
                    ) : (
                        <div className=" w-7 h-7 mr-1">
                            <BoardUnLike />
                        </div>
                    )}

                    <p className="flex ">0 </p>
                </button>
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardComment />
                    </div>
                    <p>0</p>
                </button>
            </div>
        </section>
    )
}
