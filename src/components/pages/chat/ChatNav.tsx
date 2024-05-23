'use client'
import { useState } from 'react'
import ChatMoreModal from './ChatMoreModal'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'

export default function ChatNav() {
    const [chatMoreModal, setChatMoreModal] = useState<boolean>(false)
    return (
        <section>
            <div className="bg-gray-200 bg-opacity-20 py-4 px-2">
                <div className="container mx-auto px-2 flex items-center">
                    <RouterBackArrowButton />
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p className="font-semibold">채팅방 이름</p>
                    </div>
                    <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/ios-glyphs/30/more.png"
                        alt="더보기"
                        className="ml-auto"
                        onClick={() => setChatMoreModal(true)}
                    />
                </div>
            </div>

            <ChatMoreModal chatMoreModal={chatMoreModal} setChatMoreModal={setChatMoreModal} />
        </section>
    )
}
