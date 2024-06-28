'use client'
import { useEffect, useState } from 'react'
import BoardProfile from './BoardProfile'
import BoardLikeAndComment from './BoardLikeAndComment'
import BoardImage from './BoardImage'
import Link from 'next/link'
import { BoardType } from '@/type/BoardType'
import MoreInfo from '@/components/images/MoreInfo'
import BoardSetting from './BoardSetting'
import { ReadBoard } from '@/api/board/readBoard'
import { useGetClientToken } from '@/actions/useGetClientToken'

export default function Board({ boardId }: { boardId: string }) {
    const [board, setBoard] = useState<BoardType>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const auth = useGetClientToken()

    useEffect(() => {
        const fetchBoard = async () => {
            const getBoard: BoardType = await ReadBoard(boardId)
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
                <div>
                    <div className="flex justify-between mb-4 ">
                        <Link href={`/board/${board.boardId}`} passHref scroll={false} className="space-y-2">
                            <BoardProfile
                                createdAt={board.createdAt}
                                writerName={board.writerName}
                                writerProfileImageUrl={board.writerProfileImageUrl}
                                updated={board.updated}
                            />
                        </Link>
                        {auth && auth.uuid === board.writerUuid && (
                            <button className="w-5" onClick={modalController}>
                                <MoreInfo />
                            </button>
                        )}
                    </div>
                    <Link href={`/board/${board.boardId}`} passHref scroll={false} className="space-y-2">
                        <p>{board.content}</p>
                        <BoardImage imageUrls={board.imageUrls} />
                    </Link>
                    <BoardLikeAndComment
                        boardId={board.boardId}
                        likeCount={board.likeCount}
                        commentCount={board.commentCount}
                    />
                    <BoardSetting
                        isModalOpen={isModalOpen}
                        modalController={modalController}
                        boardId={board.boardId}
                        boardPin={board.pinned}
                    />
                </div>
            )}
        </>
    )
}
