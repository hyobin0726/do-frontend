'use client'
import { CrewType } from '@/type/CrewType'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getChatList } from '@/api/chat/getChatList'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { EventSourcePolyfill } from 'event-source-polyfill'
import Image from 'next/image'
interface ChatListType {
    crewId: string
    lastChatContent: string
    unreadCount: number
    createdAt: string
}
interface MergedChatListType {
    crewId: string
    lastChatContent: string
    unreadCount: number
    createdAt: string
    name: string
    profileUrl: string
    currentParticipant: number
}
function ChatList({ crewList }: { crewList: CrewType[] }) {
    const [chatList, setChatList] = useState<ChatListType[]>([])
    const [action, setAction] = useState<boolean>(false)
    const auth = useGetClientToken()

    const fetchChatList = async () => {
        try {
            const response = await getChatList()
            setChatList(response.data)
            // console.log(response.data, '채팅방 리스트 클라이언트')
        } catch (error) {
            console.error('Error fetching chat rooms:', error)
        }
    }
    useEffect(() => {
        fetchChatList()
    }, [action])
    // 실시간 조회
    useEffect(() => {
        if (!auth.token) return
        const connectToSSE = () => {
            const EventSource = EventSourcePolyfill
            const eventSource = new EventSource(
                `${process.env.BASE_URL}/chat-service/v1/users/chat/chat-list/subscribe`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `${auth.token}`,
                    },
                },
            )
            eventSource.onmessage = (event) => {
                const newMessage = event.data
                console.log(newMessage)
                setAction(!action)
            }

            eventSource.onerror = (err) => {
                console.error('EventSource failed: ', err)
                eventSource.close()
                // Reconnect after a delay
                setTimeout(() => {
                    connectToSSE()
                }, 5000) // Reconnect after 5 seconds
            }

            return eventSource
        }

        const eventSource = connectToSSE()

        return () => {
            eventSource.close()
        }
    }, [action])
    const formatTimestamp = (timestamp: string) => {
        if (!timestamp) return ''
        const date = new Date(timestamp)
        const today = new Date()
        const isToday = today.toDateString() === date.toDateString()
        const isThisYear = today.getFullYear() === date.getFullYear()
        if (isToday) {
            return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        } else if (isThisYear) {
            return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
        } else {
            return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric' })
        }
    }
    // 채팅 리스트와 크루 리스트를 병합하여 필요한 데이터를 만듭니다.
    const mergedChatList: MergedChatListType[] = chatList.map((chat) => {
        const matchingCrew = crewList.find((crew) => crew.crewId === chat.crewId)
        return {
            ...chat,
            name: matchingCrew ? matchingCrew.name : '알 수 없음',
            profileUrl: matchingCrew ? matchingCrew.profileUrl : '',
            currentParticipant: matchingCrew ? matchingCrew.currentParticipant : 0,
        }
    })

    return (
        <main className="p-4">
            <ul>
                {mergedChatList.map((crew, idx) => (
                    <section key={idx}>
                        <li key={crew.crewId} className="mb-3 ">
                            <Link href={`/chatroom/${crew.crewId}`} passHref scroll={false}>
                                <div className="flex  items-center p-4 bg-white rounded-lg shadow transition w-full">
                                    <div className="w-full space-x-2 flex ">
                                        <div className="w-[70px] h-[60px] flex justify-center items-center ">
                                            <Image
                                                src={crew.profileUrl}
                                                alt="채팅방 프로필"
                                                width={50}
                                                height={50}
                                                className=" rounded-2xl w-[70px] h-[60px] object-cover "
                                                priority
                                            />
                                        </div>
                                        <div className="w-full flex flex-col justify-center">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <h2 className="font-bold text-[18px]">{crew.name}</h2>
                                                    <p className="text-gray-500 ml-2">{crew.currentParticipant}명</p>
                                                </div>
                                                <span className="text-gray-500 text-xs whitespace-nowrap">
                                                    {formatTimestamp(crew.createdAt)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between space-x-2 items-center ">
                                                <p className="text-gray-700 w-[90%] line-clamp-1 ">
                                                    {crew.lastChatContent}
                                                </p>
                                                {crew.unreadCount > 0 && (
                                                    <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs">
                                                        {crew.unreadCount}
                                                    </span>
                                                )}
                                            </div>
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
