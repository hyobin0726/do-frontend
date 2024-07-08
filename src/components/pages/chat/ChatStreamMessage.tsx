'use client'
import { useEffect, useRef, useState } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useParams } from 'next/navigation'
import { useGetClientToken } from '@/actions/useGetClientToken'
import ChatSender from './ChatSender'
import Chat from '@/components/images/Chat'
import ChatReceiver from './ChatReceiver'
import { CrewMemberType } from '@/type/CrewType'
import ChatEntryNotice from './ChatEntryNotice'

interface ChatMessageType {
    uuid: string
    text: string
    imageUrl: string
    entryExitNotice: string
    createdAt: string
}

export default function ChatStreamMessage({ crewMembers }: { crewMembers: CrewMemberType[] }) {
    const params = useParams<{ crewId: string }>()
    const [messages, setMessages] = useState<ChatMessageType[]>([] as ChatMessageType[])
    const auth = useGetClientToken()
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (!auth.token) return
        const ConnectionChat = async () => {
            const BodyData = {
                crewId: params.crewId,
                connectionStatus: true,
            }

            try {
                const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat/connection`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${auth.token}`,
                    },
                    body: JSON.stringify(BodyData),
                    cache: 'no-cache',
                })
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                const data = await response.json()
                return data
            } catch (error) {
                console.error('Failed to connect to chat:', error)
                throw error
            }
        }
        ConnectionChat()
    }, [params.crewId, auth.token])

    // 실시간 조회
    useEffect(() => {
        if (!auth.token) return
        const connectToSSE = () => {
            const EventSource = EventSourcePolyfill
            const eventSource = new EventSource(`${process.env.BASE_URL}/chat-service/v1/users/chat/${params.crewId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `${auth.token}`,
                },
            })

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    if (data.isSuccess) {
                        setMessages((prevMessages) => {
                            const newMessage = data.data as ChatMessageType

                            const isDuplicate = prevMessages.some(
                                (message) => message.createdAt === newMessage.createdAt,
                            )

                            if (!isDuplicate) {
                                return [...prevMessages, newMessage]
                            }
                            return prevMessages
                        })
                    } else {
                        console.error('Server error:', data.message)
                    }
                } catch (error) {
                    console.error('Error parsing message:', error)
                }
            }

            eventSource.onerror = (error) => {
                console.error('EventSource failed:', error)

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
    }, [params.crewId, auth.token])

    // 메시지가 추가될 때마다 스크롤을 메시지 리스트의 끝으로 이동
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <section>
            <div>
                {/* {messages.length > 0 && (
                    <div className="flex justify-center">
                        <div className=" bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                            {new Date().toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long',
                            })}
                        </div>
                    </div>
                )} */}
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <div className={`flex ${message.uuid === auth.uuid ? 'justify-end' : 'justify-start'}`}>
                                {message.uuid === auth.uuid ? (
                                    <ChatSender chat={message} />
                                ) : (
                                    <ChatReceiver chat={message} crewMembers={crewMembers} memberUuid={message.uuid} />
                                )}
                            </div>
                            {message.entryExitNotice && (
                                <ChatEntryNotice
                                    entryExitNotice={message.entryExitNotice}
                                    entryUuid={message.uuid}
                                    crewMembers={crewMembers}
                                />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* messagesEndRef가 참조하는 요소 */}
                </div>
            </div>
        </section>
    )
}
