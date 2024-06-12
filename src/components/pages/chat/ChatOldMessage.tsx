'use client'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface OldMessagesType {
    lastPage: number
    chatList: ChatListType[]
}
interface ChatListType {
    date: string
    chats: [
        {
            uuid: string
            text: string
            imageUrl: string
            entryExitNotice: string
            createdAt: string
        },
    ]
}

export default function ChatOldMessage() {
    const params = useParams<{ crewId: string }>()
    const [oldMessages, setOldMessages] = useState<OldMessagesType['chatList'] | []>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [lastPage, setLastPage] = useState<number>(Infinity)
    const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null)
    const uuid = 'uuid2'
    //  이전내역 조회
    useEffect(() => {
        const fetchOldMessages = async () => {
            if (currentPage > lastPage) {
                setIsFetching(false)
                return
            }
            setIsFetching(true)
            try {
                if (chatContainerRef.current) {
                    setPrevScrollHeight(chatContainerRef.current.scrollHeight)
                }
                const response = await fetch(
                    `${process.env.BASE_URL}/crew-service/v1/users/chat/history/${params.crewId}?page=${currentPage}`,
                    {
                        headers: {
                            Uuid: uuid,
                        },
                    },
                )
                if (response.ok) {
                    const data: { data: OldMessagesType } = await response.json()

                    if (data.data.chatList.length > 0) {
                        console.log('data:', data.data)
                        if (currentPage === 0) {
                            setOldMessages(data.data.chatList)
                        } else {
                            setOldMessages((prev) => [...data.data.chatList, ...prev])

                            if (prevScrollHeight !== null && chatContainerRef.current) {
                                const newScrollTop = chatContainerRef.current.scrollHeight - prevScrollHeight
                                chatContainerRef.current.scrollTop = newScrollTop
                            }
                        }
                        setLastPage(data.data.lastPage)
                    } else {
                        console.log('마지막페이지임')
                        return
                    }
                } else {
                    console.error('Failed to fetch old messages')
                }
            } catch (error) {
                console.error('이전내역 패치 실패', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchOldMessages()
    }, [currentPage, params.crewId, prevScrollHeight])
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting && !isFetching) {
                    setCurrentPage((prev) => prev + 1)
                }
            },
            {
                root: chatContainerRef.current,
                threshold: 1.0,
            },
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        }
    }, [isFetching])

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }
    useEffect(() => {
        if (currentPage === 0 && chatContainerRef.current) {
            scrollToBottom()
        }
    }, [oldMessages])
    console.log(currentPage)
    return (
        <div ref={chatContainerRef} style={{ height: '630px', overflow: 'scroll' }}>
            <div ref={loaderRef} style={{ height: '1px' }}></div>
            {oldMessages &&
                oldMessages.map((messageGroup, idx) => (
                    <div key={idx}>
                        <div className="flex justify-center">
                            <div className="relative bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                                {new Date(messageGroup.date).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    weekday: 'long',
                                })}
                            </div>
                        </div>

                        {messageGroup.chats.map((chat, index) => (
                            <div key={index}>
                                <div
                                    className={`flex mb-4 mt-2 ${chat.uuid === uuid ? 'justify-end' : 'justify-start'}`}
                                >
                                    {chat.uuid === uuid ? (
                                        <>
                                            {chat.text && (
                                                <>
                                                    <div className="text-gray-500 text-sm mr-2 self-end">
                                                        {new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                    <div className="bg-hobbing-red text-white py-2 px-4 rounded-lg">
                                                        {chat.text}
                                                    </div>
                                                </>
                                            )}
                                            {chat.imageUrl && (
                                                <>
                                                    <div className="text-gray-500 text-sm mr-2 self-end">
                                                        {new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                    <div className="bg-hobbing-red text-white py-2 px-4 rounded-lg w-36">
                                                        <img src={chat.imageUrl} alt="Image" />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {chat.imageUrl && (
                                                <div>
                                                    <div className="flex items-center">
                                                        <div className="bg-[#D9D9D9] rounded-full w-10 h-10 flex items-center justify-center text-sm">
                                                            프로필
                                                        </div>
                                                        <p className="text-xs text-gray-600 ml-1">사용자1</p>
                                                    </div>
                                                    <div className="flex mt-2 ml-2">
                                                        <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg w-36">
                                                            <img src={chat.imageUrl} alt="Image" />
                                                        </div>
                                                        <div className="text-gray-500 text-sm ml-2 self-end">
                                                            {new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {chat.text && (
                                                <div>
                                                    <div className="flex items-center">
                                                        <div className="bg-[#D9D9D9] rounded-full w-10 h-10 flex items-center justify-center text-sm">
                                                            프로필
                                                        </div>
                                                        <p className="text-xs text-gray-600 ml-1">사용자1</p>
                                                    </div>
                                                    <div className="flex mt-2 ml-2">
                                                        <div className="bg-white border border-[#E5EBEF] text-gray-800 py-2 px-4 rounded-lg">
                                                            {chat.text}
                                                        </div>
                                                        <div className="text-gray-500 text-sm ml-2 self-end">
                                                            {new Date(chat.createdAt).toLocaleTimeString('ko-KR', {
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

                                {chat.entryExitNotice && (
                                    <div className="flex justify-center mb-4">
                                        <div className="relative bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                                            {chat.entryExitNotice}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    )
}
