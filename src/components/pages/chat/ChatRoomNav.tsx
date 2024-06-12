'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import { useEffect, useState } from 'react'
import ChatMenuModal from './ChatMenuModal'
import ShareKakao from '@/components/common/ShareKakao'
import { useParams } from 'next/navigation'

export default function ChatRoomNav() {
    const uuid = 'uuid1234'
    const params = useParams<{ crewId: string }>()
    const [chatMenu, setChatMenu] = useState<boolean>(false)

    const crew = {
        id: 1,
        name: '해운대 크루',
        Introduction: '#해운대 #러닝 #취미',
        profile_url: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/1716864446634Group+1000001922.png',
    }

    const disconnectChat = async () => {
        const BodyData = {
            crewId: '1',
            connectionStatus: false,
            lastReadAt: Date.now(),
        }
        console.log('BodyData:', BodyData)
        try {
            const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat/connection`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Uuid: uuid,
                },
                body: JSON.stringify(BodyData),
                cache: 'force-cache',
            })
            if (response.ok) {
                console.log('Last message info sent successfully')
            } else {
                console.error('Failed to send last message info')
            }
        } catch (error) {
            console.error('Error sending last message info:', error)
        }
    }
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            disconnectChat()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    return (
        <>
            <div className="bg-white drop-shadow-sm bg-opacity-50 py-4 px-2 h-[70px]">
                <div className="relative  mx-auto px-2 flex items-center">
                    <div onClick={() => disconnectChat()}>
                        <RouterBackArrowButton />
                    </div>
                    <div className="flex-1 text-center ">
                        <p className="font-semibold">{crew.name}</p>
                        <ShareKakao
                            thumbnail={crew.profile_url}
                            crewName={crew.name}
                            crewIntroduction={crew.Introduction}
                            path={`chatroom/${crew.id}`}
                        />
                    </div>
                    <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/ios-glyphs/30/more.png"
                        alt="더보기"
                        className="ml-auto"
                        onClick={() => setChatMenu(true)}
                    />
                </div>
            </div>
            <ChatMenuModal chatMenuModal={chatMenu} setChatMenuModal={setChatMenu} crewId={params.crewId} />
        </>
    )
}
