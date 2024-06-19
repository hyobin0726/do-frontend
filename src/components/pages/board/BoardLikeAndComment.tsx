'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import BoardLike from '@/components/images/BoarLike'
import BoardComment from '@/components/images/BoardCommet'
import { useEffect, useState } from 'react'

export default function BoardLikeAndComment({ boardId }: { boardId: string }) {
    const [board, setBoard] = useState<[]>([])
    const auth = useGetClientToken()
    useEffect(() => {
        GetBoard()
    }, [])
    const GetBoard = async () => {
        const data = await fetch(`${process.env.BASE_URL}/batch-service/v1/users/crew/board-stats/${boardId}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Uuid: `${auth.token}`,
            },
        })
        const response = await data.json()
        if (response.isSuccess === true) {
            setBoard(response.data)
            // console.log('게시글을 불러왔습니다.', response.data)
        }
        return response.data
    }
    // console.log(board)
    return (
        <section className="border-t-[1px]">
            <div className="flex space-x-4 mt-2">
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardLike />
                    </div>
                    {/* <p className="flex ">{board.likeCount} </p> */}
                </button>
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardComment />
                    </div>
                    {/* <p>{board.commentCount}</p> */}
                </button>
            </div>
        </section>
    )
}
