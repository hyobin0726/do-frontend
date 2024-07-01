'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ChatSender from './ChatSender'
import ChatReceiver from './ChatReceiver'
import ChatDate from './ChatDate'
import ChatEntryNotice from './ChatEntryNotice'
import { CrewMemberType } from '@/type/CrewType'

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
    crewMembers,
}: {
    currentPage: number
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
    chatContainerRef: React.RefObject<HTMLDivElement>
    crewMembers: CrewMemberType[]
}) {
    const params = useParams<{ crewId: string }>()
    const [oldMessages, setOldMessages] = useState<OldMessagesType['chatList']>([])
    const [lastPage, setLastPage] = useState<number>(Infinity)
    const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)
    const auth = useGetClientToken()
    // console.log('auth:', auth.token)
    //  이전내역 조회

    useEffect(() => {
        if (!auth.token) return
        const fetchOldMessages = async () => {
            if (currentPage >= lastPage) {
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
                        // console.log('data:', data.data)
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
    }, [currentPage, params.crewId, prevScrollHeight, chatContainerRef, setIsFetching, lastPage, auth.token])

    // console.log(lastPage, 'last')
    // console.log(currentPage, 'current')
    // console.log('getOldMessages:', oldMessages)
    // console.log('crewMembers:', crewMembers)
    return (
        <section>
            {oldMessages &&
                oldMessages.map((messageGroup, idx) => (
                    <div key={idx}>
                        {idx === 0 || messageGroup.date !== oldMessages[idx - 1]?.date ? (
                            <ChatDate date={messageGroup.date} />
                        ) : null}
                        {messageGroup.chats.map((chat, index) => (
                            <div key={index}>
                                <div className={`flex ${chat.uuid === auth.uuid ? 'justify-end' : 'justify-start'}`}>
                                    {chat.uuid === auth.uuid ? (
                                        <ChatSender key={index} chat={chat} />
                                    ) : (
                                        <ChatReceiver
                                            key={index}
                                            chat={chat}
                                            crewMembers={crewMembers}
                                            memberUuid={chat.uuid}
                                        />
                                    )}
                                </div>

                                {chat.entryExitNotice && (
                                    <ChatEntryNotice
                                        entryExitNotice={chat.entryExitNotice}
                                        entryUuid={chat.uuid}
                                        crewMembers={crewMembers}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
        </section>
    )
}
