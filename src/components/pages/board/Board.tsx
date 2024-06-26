'use client'
import { useEffect, useState } from 'react'
import BoardProfile from './BoardProfile'
import BoardLikeAndComment from './BoardLikeAndComment'
import BoardImage from './BoardImage'
import Link from 'next/link'
import { BoardType } from '@/type/BoardType'
import { GetBoard } from '@/api/board/board'
import MoreInfo from '@/components/images/MoreInfo'
import BoardSetting from './BoardSetting'

export default function Board({ boardId }: { boardId: string }) {
    const [board, setBoard] = useState<BoardType>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    useEffect(() => {
        const fetchBoard = async () => {
            const getBoard: BoardType = await GetBoard(boardId)
            setBoard(getBoard)
        }
        fetchBoard()
    }, [boardId])

    const modalController = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <>
            {board && (
                <>
                    <Link href={`/board/${board.boardId}`} passHref scroll={false} className=" space-y-2">
                        <BoardProfile writerUuid={board.writerUuid} createdAt={board.createdAt} />
                        <p>{board.content}</p>
                        <BoardImage imageUrls={board.imageUrls} />
                    </Link>
                    <button className="w-5" onClick={modalController}>
                        <MoreInfo />
                    </button>
                    <BoardLikeAndComment boardId={boardId} />
                    <BoardSetting isModalOpen={isModalOpen} modalController={modalController} boardId={board.boardId} />
                </>
            )}
        </>
    )
}
