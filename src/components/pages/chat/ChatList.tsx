'use client'
import { CrewType } from '@/type/CrewType'
import Link from 'next/link'
import ChatListLastMessage from './ChatListLastMessage'

function ChatList({ crewList }: { crewList: CrewType[] }) {
    // console.log('crewList:', crewList)
    return (
        <main className="p-4">
            <ul>
                {crewList?.map((crew, idx) => (
                    <section key={idx}>
                        <li key={crew.crewId} className="mb-4">
                            <Link href={`/chatroom/${crew.crewId}`}>
                                <div className="flex justify-between items-center p-4 bg-hobbing-light-pink rounded-lg shadow  transition">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={crew.profileUrl}
                                            alt="채팅방 프로필"
                                            className="w-14 h-14 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <h2 className="text-lg font-bold">{crew.name}</h2>
                                                <p className="text-gray-500 ml-2">{crew.currentParticipant}명</p>
                                            </div>
                                            <ChatListLastMessage crewId={crew.crewId} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </section>
                ))}
            </ul>
        </main>
    )
}
export default ChatList
