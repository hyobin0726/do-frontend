'use client'
import Board from './Board'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { useEffect, useRef, useState } from 'react'
import { useBoardStore } from '@/hooks/useBoardStore'

interface BoardListIds {
    boardId: string
    pinned: boolean
}
export default function BoardList() {
    const auth = useGetClientToken()
    const { selectedCrewId } = useBoardStore()
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [boardList, setBoardList] = useState<BoardListIds[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isLast, setIsLast] = useState<boolean>(false)

    const loader = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const GetBoardList = async () => {
            setIsFetching(true)
            try {
                const data = await fetch(
                    `${process.env.BASE_URL}/board-service/v1/users/crew/board/${selectedCrewId}/board-list?page=${currentPage}&size=3`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Uuid: `${auth.token}`,
                        },
                        // cache: 'reload',
                    },
                )

                const response = await data.json()

                if (response.isSuccess) {
                    if (currentPage === 0) {
                        setBoardList(response.data.boardList)
                    } else {
                        setBoardList((prev) => [...prev, ...response.data.boardList])
                    }
                    setIsLast(response.data.isLast)
                } else {
                    console.error('게시글 목록을 불러오는데 실패했습니다.')
                }
            } catch (error) {
                console.error('게시글 목록을 불러오는데 실패했습니다.', error)
            }
            setIsFetching(false)
        }
        GetBoardList()
    }, [currentPage, selectedCrewId])

    useEffect(() => {
        if (!loader.current || isLast) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    setCurrentPage((prevPage) => prevPage + 1)
                }
            },
            {
                rootMargin: '20px',
                threshold: 1.0,
            },
        )

        observer.observe(loader.current)

        return () => {
            if (loader.current) observer.unobserve(loader.current)
        }
    }, [isFetching, isLast])

    return (
        <div>
            {boardList.map((item: BoardListIds, index) => (
                <div key={index}>
                    <Board boardId={item.boardId} />
                </div>
            ))}
            <div ref={loader} style={{ height: '100px', margin: '30px', textAlign: 'center' }}>
                {!isLast ? <span>로딩 중...</span> : ''}
            </div>
        </div>
    )
}
