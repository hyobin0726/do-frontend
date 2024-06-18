'use client'
import Board from './Board'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface BoardListIds {
    boardId: string
    pinned: boolean
}

export default function BoardList({ data, crewId }: { data: BoardListIds[]; crewId: string }) {
    const auth = useGetClientToken()
    const [boardList, setBoardList] = useState<BoardListIds[]>(data)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isLast, setIsLast] = useState<boolean>(false)
    const [scrollPosition, setScrollPosition] = useState<number>(0) // 스크롤 위치 저장
    const getPageNumber = useSearchParams().get('page') || '0'
    const router = useRouter()

    const loader = useRef<HTMLDivElement | null>(null)

    // 현재 스크롤 위치를 저장하는 함수
    const saveScrollPosition = () => {
        setScrollPosition(window.scrollY)
    }

    // 스크롤 위치를 복원하는 함수
    const restoreScrollPosition = () => {
        window.scrollTo(0, scrollPosition)
    }

    const GetBoardList = async (page: string) => {
        setIsFetching(true)
        try {
            const response = await fetch(
                `${process.env.BASE_URL}/board-service/v1/users/crew/board/${crewId}/board-list?page=${page}&size=3`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Uuid: `${auth.token}`,
                    },
                },
            )
            const data = await response.json()
            if (data.isSuccess) {
                // console.log(data.data.isLast)
                setBoardList((prev) => [...prev, ...data.data.boardList])
                if (data.data.isLast === true) {
                    setIsLast(true)
                }
            } else {
                console.error('게시글 목록을 불러오는데 실패했습니다.')
            }
        } catch (error) {
            console.error('게시글 목록을 불러오는데 실패했습니다.', error)
        }
        setIsFetching(false)
        restoreScrollPosition() // 데이터를 불러온 후 스크롤 위치 복원
    }

    useEffect(() => {
        saveScrollPosition()
        GetBoardList(getPageNumber)
    }, [getPageNumber, crewId])

    useEffect(() => {
        if (!loader.current || isLast) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    const nextPage = parseInt(getPageNumber) + 1
                    saveScrollPosition()
                    router.push(`/${crewId}?page=${nextPage}`)
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
    }, [isFetching, isLast, getPageNumber, crewId, router])

    return (
        <section>
            {boardList.map((item: BoardListIds, index) => (
                <div className="p-5 space-y-2 border-[1px] border-hobbing-gray" key={index}>
                    <Board boardId={item.boardId} />
                </div>
            ))}
            {boardList.length !== 0 && (
                <div ref={loader} style={{ height: '50px', margin: '30px', textAlign: 'center' }}>
                    {!isLast && <span>로딩 중...</span>}
                </div>
            )}
        </section>
    )
}
