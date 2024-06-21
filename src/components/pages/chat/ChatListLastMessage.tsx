'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useEffect, useState } from 'react'

interface ChatListType {
    crewId: string
    lastChatContent: string
    unreadCount: number
    createdAt: string
}
function ChatListLastMessage({ crewId }: { crewId: string }) {
    // console.log('crewId:', crewId)
    const [chatList, setChatList] = useState<ChatListType>()
    const auth = useGetClientToken()
    // console.log('auth:', auth.token)

    useEffect(() => {
        const connectToSSE = () => {
            const EventSource = EventSourcePolyfill
            const eventSource = new EventSource(
                `${process.env.BASE_URL}/chat-service/v1/users/chat/latest/stream/${crewId}`,
                {
                    headers: {
                        Authorization: `${auth.token}`,
                    },
                },
            )
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.isSuccess === true) {
                    console.log('소모임 목록을 불러왔습니다.', data.data)
                    setChatList(data.data)
                }
                // console.log('event:', event)
                return data.data
            }
            eventSource.onerror = (error) => {
                console.error('Failed to get chat list:', error)
                eventSource.close()
                setTimeout(() => {
                    connectToSSE()
                }, 5000)
            }
            return eventSource
        }
        const eventSource = connectToSSE()

        return () => {
            eventSource.close()
        }
    }, [])
    // console.log('data:', chatList)

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
        <main>
            <ul>
                {chatList && (
                    <section className="bg-red-500">
                        {formatTimestamp(chatList.createdAt)}
                        <p className="text-gray-700">{chatList.lastChatContent}</p>
                        {chatList.unreadCount > 0 && (
                            <span className="bg-[#F15C45] rounded-lg px-2 py-1 text-white text-sm ">
                                {chatList.unreadCount}
                            </span>
                        )}
                    </section>
                )}
            </ul>
        </main>
    )
}
export default ChatListLastMessage
