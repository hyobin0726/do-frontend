'use client'
import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/SocketProvider'

interface MessageData {
    message: string
    timestamp: string
}

export default function ChatMessage() {
    const [inbox, setInbox] = useState<MessageData[]>([])
    const socket = useSocket()

    useEffect(() => {
        if (!socket) return

        const handleMessage = (data: MessageData) => {
            setInbox((prevInbox) => [...prevInbox, data])
        }

        socket.on('message', handleMessage)

        return () => {
            socket.off('message', handleMessage)
        }
    }, [socket])
    return (
        <section className=" bg-gray-100 h-[calc(100vh-11rem)] ">
            <div className=" px-2 py-4 ">
                <div className="flex justify-center">
                    <div className="relative bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                        2024년 5월 9일 목요일
                    </div>
                </div>
                <div className="flex mb-4 justify-end mt-2">
                    <div className="text-gray-500 text-sm mr-2 self-end">12:34 PM</div>
                    <div className="bg-hobbing-red text-white py-2 px-4 rounded-lg">안녕하세요!</div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <div className="bg-[#D9D9D9]  rounded-full w-10 h-10 flex items-center justify-center text-sm">
                            프로필
                        </div>

                        <p className="text-sm text-gray-600 ml-2">사용자1</p>
                    </div>
                    <div className="flex mt-2 ml-2">
                        <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg">
                            안녕하세요! 반가워요.
                        </div>
                        <div className="text-gray-500 text-sm ml-2 self-end">12:35 PM</div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                        사용자2 님이 나갔습니다
                    </div>
                </div>
                <div>
                    {inbox.map((msg, index) => (
                        <div key={index} className="flex mb-4 justify-end mt-2">
                            <div className="text-gray-500 text-sm mr-2 self-end">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                            <div className="bg-hobbing-red text-white py-2 px-4 rounded-lg">{msg.message}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
