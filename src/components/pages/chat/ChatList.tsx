'use client'
import { CrewType } from '@/type/CrewType'
import Link from 'next/link'
import ChatListLastMessage from './ChatListLastMessage'
import { useEffect, useState } from 'react'

function ChatList({ crewList }: { crewList: CrewType[] }) {
    // console.log('crewList:', crewList)
    const [sortedCrewList, setSortedCrewList] = useState<CrewType[]>([])
    const [createdAtMap, setCreatedAtMap] = useState<Map<string, string>>(new Map())
    // createdAt을 업데이트하는 함수
    const updateCreatedAt = (crewId: string, createdAt: string) => {
        setCreatedAtMap((prevMap) => new Map(prevMap).set(crewId, createdAt))
    }
    // crewList가 업데이트될 때마다 정렬 처리
    useEffect(() => {
        const sortedList = crewList.slice().sort((a, b) => {
            const createdAtA = createdAtMap.get(a.crewId) || ''
            const createdAtB = createdAtMap.get(b.crewId) || ''
            return new Date(createdAtB).getTime() - new Date(createdAtA).getTime() // 내림차순 정렬
        })
        setSortedCrewList(sortedList)
    }, [crewList, createdAtMap])
    return (
        <main className="p-4 ">
            <ul>
                {sortedCrewList.map((crew, idx) => (
                    <section key={idx}>
                        <li key={crew.crewId} className="mb-3 ">
                            <Link href={`/chatroom/${crew.crewId}`}>
                                <div className="flex justify-between items-center p-4 bg-white  rounded-lg shadow  transition w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <img
                                            src={crew.profileUrl}
                                            alt="채팅방 프로필"
                                            className="w-16 h-14 rounded-2xl "
                                        />
                                        <div className="flex flex-col w-full">
                                            <div className="flex items-end">
                                                <h2 className="font-bold text-[18px]">{crew.name}</h2>
                                                <p className="text-gray-500 ml-2">{crew.currentParticipant}명</p>
                                            </div>
                                            <ChatListLastMessage
                                                crewId={crew.crewId}
                                                onUpdateCreatedAt={updateCreatedAt}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </section>
                ))}
            </ul>
        </main>
    )
}
export default ChatList
