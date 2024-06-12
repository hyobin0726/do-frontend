'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
interface ChatListType {
    crewId: string
    lastChatContent: string
    unreadCount: number
    createdAt: string
}
function ChatList() {
    const [chatList, setChatList] = useState<ChatListType[]>([])

    useEffect(() => {
        const GetChatList = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/chat/latest/list`, {
                    headers: {
                        Uuid: 'uuid1234',
                    },
                })
                if (response.ok) {
                    const data = (await response.json()) as { data: ChatListType[] }
                    console.log('data:', data)
                    setChatList(data.data)
                } else {
                    throw new Error(`Error: ${response.status}`)
                }
            } catch (error) {
                console.error('Failed to get chat list:', error)
                throw error
            }
        }
        GetChatList()
    }, [])

    const formatTimestamp = (timestamp: string) => {
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
    return (
        <main className="mx-auto ">
            <ul>
                {chatList.map((room) => (
                    <Link href={`/chatroom/${room.crewId}`} key={room.crewId}>
                        <div className="flex justify-between items-center mb-2 p-4">
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#D9D9D9] rounded-full w-14 h-14 flex items-center justify-center text-sm">
                                    프로필
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-bold">해운대</h2>
                                        <p className="text-gray-500 ml-2">5</p>
                                        <span className="text-gray-500 text-sm absolute right-4 ">
                                            {formatTimestamp(room.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-gray-700">{room.lastChatContent}</p>
                                        {room.unreadCount > 0 && (
                                            <span className="bg-[#F15C45] rounded-lg px-2 py-1 text-white text-sm absolute right-4 ">
                                                {room.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
        </main>
    )
}
export default ChatList
