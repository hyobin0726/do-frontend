'use client'
import { useEffect, useState } from 'react'
import BoardProfile from './BoardProfile'
import BoardLikeAndComment from './BoardLikeAndComment'
import BoardImage from './BoardImage'
import Link from 'next/link'
import { BoardType } from '@/type/BoardType'
import { GetBoard } from '@/api/board/board'

export default function Board({ boardId }: { boardId: string }) {
    const [board, setBoard] = useState<BoardType>()
    useEffect(() => {
        const fetchBoard = async () => {
            const getBoard: BoardType = await GetBoard(boardId)
            setBoard(getBoard)
        }
        fetchBoard()
    }, [boardId])

    return (
        <>
            {board && (
                <>
                    <Link href={`/board/${board.boardId}`} className=" space-y-2 ">
                        <BoardProfile writerUuid={board.writerUuid} createdAt={board.createdAt} />
                        <p>{board.content}</p>
                        <BoardImage imageUrls={board.imageUrls} />
                    </Link>
                    <BoardLikeAndComment boardId={boardId} />
                </>
            )}
        </>
    )
}
