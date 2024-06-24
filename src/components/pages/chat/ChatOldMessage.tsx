'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { getChatOldMessage } from '@/api/chat/chatOldMessage'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface OldMessagesType {
    lastPage: number
    chatList: ChatListType[]
}
interface ChatListType {
    date: string
    chats: {
        uuid: string
        text?: string
        imageUrl?: string
        entryExitNotice?: string
        createdAt: string
    }[]
}

export default function ChatOldMessage({
    currentPage,
    setIsFetching,
    chatContainerRef,
}: {
    currentPage: number
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
    chatContainerRef: React.RefObject<HTMLDivElement>
}) {
    const params = useParams<{ crewId: string }>()
    console.log('params:', params.crewId)
    const [oldMessages, setOldMessages] = useState<OldMessagesType['chatList']>([])
    const [lastPage, setLastPage] = useState<number>(Infinity)
    const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)
    const auth = useGetClientToken()
    console.log(auth.token)
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
                    `${process.env.BASE_URL}/chat-service/v1/users/chat/history/${params.crewId}?page=${currentPage}`,
                    {
                        headers: {
                            Authorization: `${auth.token}`,
                        },
                    },
                )
                if (response.ok) {
                    const data: { data: OldMessagesType } = await response.json()

                    if (data.data.chatList.length > 0) {
                        console.log('data:', data.data)
                        if (currentPage === 0) {
                            setOldMessages(data.data.chatList)
                            if (chatContainerRef.current) {
                                setTimeout(() => {
                                    if (chatContainerRef.current) {
                                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
                                    }
                                }, 0)
                            }
                        } else {
                            const lastMessageDate = oldMessages[oldMessages.length - 1].date
                            const currentMessageDate = data.data.chatList[0].date
                            setOldMessages((prev) => [...data.data.chatList, ...prev])

                            if (prevScrollHeight !== null && chatContainerRef.current) {
                                const newScrollTop = chatContainerRef.current.scrollHeight - prevScrollHeight
                                chatContainerRef.current.scrollTop = newScrollTop
                            }
                            if (lastMessageDate !== currentMessageDate) {
                                setOldMessages((prev) => [...prev, { date: currentMessageDate, chats: [] }])
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
    }, [currentPage, params.crewId, prevScrollHeight, chatContainerRef, setIsFetching, lastPage])

    console.log('getOldMessages:', oldMessages)

    return (
        <div>
            {oldMessages &&
                oldMessages.map((messageGroup, idx) => (
                    <div key={idx}>
                        {idx === 0 || messageGroup.date !== oldMessages[idx - 1]?.date ? (
                            <div className="flex justify-center">
                                <div className="bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                                    {new Date(messageGroup.date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        weekday: 'long',
                                    })}
                                </div>
                            </div>
                        ) : null}
                        {messageGroup.chats.map((chat, index) => (
                            <div key={index}>
                                <div
                                    className={`flex mb-4 mt-2 ${chat.uuid === auth.uuid ? 'justify-end' : 'justify-start'}`}
                                >
                                    {chat.uuid === auth.uuid ? (
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
