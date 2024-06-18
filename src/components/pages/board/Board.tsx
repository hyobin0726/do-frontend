'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { useEffect, useState } from 'react'
import BoardProfile from './BoardProfile'
import BoardLikeAndComment from './BoardLikeAndComment'
import BoardImage from './BoardImage'
import Link from 'next/link'
import { BoardType } from '@/type/BoardType'

export default function Board({ boardId }: { boardId: string }) {
    const [board, setBoard] = useState<BoardType>({} as BoardType)
    const auth = useGetClientToken()
    useEffect(() => {
        const GetBoard = async () => {
            try {
                const data = await fetch(`${process.env.BASE_URL}/board-service/v1/users/crew/board/${boardId}`, {
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
                } else {
                    console.error('게시글을 불러오는데 실패했습니다.')
                }
            } catch (error) {
                console.error('네트워크 에러', error)
            }
        }
        GetBoard()
    }, [boardId])

    return (
        <>
            <Link href={`/board/${board.boardId}`} className=" space-y-2 ">
                <BoardProfile writerUuid={board.writerUuid} createdAt={board.createdAt} />
                <p>{board.content}</p>
                <BoardImage imageUrls={board.imageUrls} />
            </Link>
            <BoardLikeAndComment />
        </>
    )
}
