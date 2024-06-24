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
                // if (error) {
                //     setChatList({
                //         crewId: crewId,
                //         lastChatContent: '새로운 소모임이 생성되었습니다.',
                //         unreadCount: 0,
                //         createdAt: '',
                //     })
                // } else {
                //     eventSource.close()
                //     setTimeout(() => {
                //         // connectToSSE()
                //     }, 5000)
                // }
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
    return (
        <main>
            <ul>
                {chatList && (
                    <div className=" flex justify-between  w-full">
                        <p className="text-gray-700 truncate flex-1 ">{chatList.lastChatContent}</p>
                        <div className="flex flex-col items-end ml-4">
                            <span className="text-gray-500 text-xs">{formatTimestamp(chatList.createdAt)}</span>
                            {chatList.unreadCount > 0 && (
                                <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs mt-1">
                                    {chatList.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </ul>
        </main>
    )
}
export default ChatListLastMessage
