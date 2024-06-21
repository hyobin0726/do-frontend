'use client'
import { useEffect, useState } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useParams } from 'next/navigation'
import { useGetClientToken } from '@/actions/useGetClientToken'

interface ChatMessageType {
    uuid: string
    text: string
    imageUrl: string
    entryExitNotice: string
    createdAt: string
}

export default function ChatStreamMessage() {
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
    }, [params.crewId])

    return (
        <section>
            <div className="">
                {messages.length > 0 && (
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
                )}
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <div
                                className={`flex mb-4 mt-2 ${message.uuid === auth.uuid ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.uuid === auth.uuid ? (
                                    <>
                                        {message.text && (
                                            <>
                                                <div className="text-gray-500 text-sm mr-2 self-end">
                                                    {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                                <div className="bg-hobbing-red text-white py-2 px-4 rounded-lg ">
                                                    {message.text}
                                                </div>
                                            </>
                                        )}
                                        {message.imageUrl && (
                                            <>
                                                <div className="text-gray-500 text-sm mr-2 self-end">
                                                    {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                                <div className="bg-hobbing-red text-white py-2 px-4 rounded-lg w-36">
                                                    <img src={message.imageUrl} alt="Image" />
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {message.imageUrl && (
                                            <div>
                                                <div className="flex items-center">
                                                    <div className="bg-[#D9D9D9]  rounded-full w-10 h-10 flex items-center justify-center text-sm">
                                                        프로필
                                                    </div>
                                                    <p className="text-xs text-gray-600 ml-1">사용자1</p>
                                                </div>
                                                <div className="flex mt-2 ml-2">
                                                    <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg w-36">
                                                        <img src={message.imageUrl} alt="Image" />
                                                    </div>
                                                    <div className="text-gray-500 text-sm ml-2 self-end ">
                                                        {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {message.text && (
                                            <div>
                                                <div className="flex items-center">
                                                    <div className="bg-[#D9D9D9]  rounded-full w-10 h-10 flex items-center justify-center text-sm">
                                                        프로필
                                                    </div>
                                                    <p className="text-xs text-gray-600 ml-1">사용자1</p>
                                                </div>
                                                <div className="flex mt-2 ml-2">
                                                    <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg ">
                                                        {message.text}
                                                    </div>
                                                    <div className="text-gray-500 text-sm ml-2 self-end ">
                                                        {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {message.entryExitNotice && (
                                <div className="flex justify-center">
                                    <div className="relative bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                                        {message.entryExitNotice}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
