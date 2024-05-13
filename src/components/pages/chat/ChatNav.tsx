'use client'
import Image from 'next/image'
import profile from '@/assets/images/profile.jpeg'
import { useState } from 'react'
import ChatRoomListModal from './ChatRoomListModal'
import ChatMoreModal from './ChatMoreModal'


export default function ChatNav() {
    const [chatListModal, setChatListModal] = useState<boolean>(false)
    const [chatMoreModal, setChatMoreModal] = useState<boolean>(false)
    return (
        <section>
            <div className="h-15 bg-gray-100 px-3 py-1 flex items-center">
                <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios/50/menu--v1.png"
                    alt="채팅방 더보기"
                    onClick={() => setChatListModal(true)}
                />

                <Image src={profile} alt="프로필 사진" width={45} height={45} className="rounded-full ml-2" />
                <div className="ml-3">
                    <p className="font-semibold">채팅방 이름</p>
                    <div className="flex">
                        <img
                            width="25"
                            height="25"
                            src="https://img.icons8.com/pastel-glyph/64/person-male--v3.png"
                            alt="채팅방 인원"
                        />
                        <p className="mt-1">5</p>
                    </div>
                </div>
                <img
                    width="25"
                    height="25"
                    src="https://img.icons8.com/ios-glyphs/30/more.png"
                    alt="더보기"
                    className="absolute right-2"
                    onClick={() => setChatMoreModal(true)}
                />
            </div>
            <ChatRoomListModal chatListModal={chatListModal} setChatListModal={setChatListModal} />
            <ChatMoreModal chatMoreModal={chatMoreModal} setChatMoreModal={setChatMoreModal} />
        </section>
    )
}
