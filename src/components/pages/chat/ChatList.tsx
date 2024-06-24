'use client'
import { CrewType } from '@/type/CrewType'
import Link from 'next/link'
import ChatListLastMessage from './ChatListLastMessage'

function ChatList({ crewList }: { crewList: CrewType[] }) {
    // console.log('crewList:', crewList)
    return (
        <main className="p-4 ">
            <ul>
                {crewList?.map((crew, idx) => (
                    <section key={idx}>
                        <li key={crew.crewId} className="mb-3 ">
                            <Link href={`/chatroom/${crew.crewId}`}>
                                <div className="flex justify-between items-center p-4 bg-white  rounded-lg shadow  transition w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <img
                                            src={crew.profileUrl}
                                            alt="채팅방 프로필"
                                            className="w-16 h-14 rounded-2xl "
                                        />
                                        <div className="flex flex-col w-full">
                                            <div className="flex items-end">
                                                <h2 className="font-bold text-[18px]">{crew.name}</h2>
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
