'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getCrewBoardList } from '@/api/board/BoardList'
import Board from './Board'

interface BoardListIds {
    boardId: string
    pinned: boolean
}

export default function BoardList({
    data,
    crewId,
    lastPage,
}: {
    data: BoardListIds[]
    crewId: string
    lastPage: boolean
}) {
    const [boardList, setBoardList] = useState<BoardListIds[]>(data)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isLast, setIsLast] = useState<boolean>(lastPage)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const router = useRouter()

    const loader = useRef<HTMLDivElement | null>(null)

    const loadMoreItems = useCallback(async () => {
        if (isFetching || isLast) return

        setIsFetching(true)
        try {
            const data = await getCrewBoardList(crewId, currentPage)
            if (data) {
                setBoardList((prevList) => [...prevList, ...data.boardList])
                if (data.isLast) {
                    setIsLast(true)
                } else {
                    setCurrentPage((prevPage) => prevPage + 1)
                    router.push(`/boardlist/${crewId}?page=${currentPage + 1}`, { scroll: false }) // URL 업데이트
                }
            } else {
                console.error('게시글 목록을 불러오는데 실패했습니다.')
            }
        } catch (error) {
            console.error('데이터를 불러오는 중 오류가 발생했습니다:', error)
        } finally {
            setIsFetching(false)
        }
    }, [crewId, currentPage, isFetching, isLast])

    useEffect(() => {
        if (!loader.current || isLast) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    loadMoreItems()
                }
            },
            {
                rootMargin: '20px',
                threshold: 1.0,
            },
        )

        observer.observe(loader.current)

        return () => {
            if (loader.current) observer.disconnect()
        }
    }, [isFetching, isLast, loadMoreItems])

    return (
        <section>
            {boardList.map((item: BoardListIds, index) => (
                <div className="p-5 space-y-2 border-[1px] border-hobbing-gray" key={index}>
                    <Board boardId={item.boardId} />
                </div>
            ))}
            {boardList.length !== 0 && (
                <div ref={loader} style={{ height: '10px', textAlign: 'center' }}>
                    {!isLast && <span>로딩 중...</span>}
                </div>
            )}
        </section>
    )
}
