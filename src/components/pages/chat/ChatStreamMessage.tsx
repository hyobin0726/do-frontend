'use client'
import { useEffect, useState } from 'react'
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

    useEffect(() => {
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
                console.log('data:', data)
                return data
            } catch (error) {
                console.error('Failed to connect to chat:', error)
                throw error
            }
        }
        ConnectionChat()
    }, [params.crewId])

    // 실시간 조회
    useEffect(() => {
        const connectToSSE = () => {
            const EventSource = EventSourcePolyfill
            const eventSource = new EventSource(`${process.env.BASE_URL}/chat-service/v1/users/chat/${params.crewId}`, {
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
                // setTimeout(() => {
                //     connectToSSE()
                // }, 35000)
            }
            return eventSource
        }
        const eventSource = connectToSSE()

        return () => {
            eventSource.close()
        }
    }, [params.crewId])

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
                            <div
                                className={`flex mb-4 mt-2 ${message.uuid === auth.uuid ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.uuid === auth.uuid ? (
                                    <ChatSender chat={message} />
                                ) : (
                                    <ChatReceiver chat={message} crewMembers={crewMembers} />
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
                </div>
            </div>
        </section>
    )
}
