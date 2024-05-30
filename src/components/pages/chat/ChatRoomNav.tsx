'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import { useState } from 'react'
import ChatMenuModal from './ChatMenuModal'
import ShareKakao from '@/components/common/ShareKakao'

export default function ChatRoomNav() {
    const crew = {
        id: 1,
        name: '해운대 크루',
        Introduction: '#해운대 #러닝 #취미',
        profile_url: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/1716864446634Group+1000001922.png',
    }

    const [chatMenu, setChatMenu] = useState<boolean>(false)
    return (
        <>
            <div className="bg-white bg-opacity-50 py-4 px-2">
                <div className="relative  mx-auto px-2 flex items-center">
                    <RouterBackArrowButton />
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
            <ChatMenuModal chatMenuModal={chatMenu} setChatMenuModal={setChatMenu} />
        </>
    )
}
