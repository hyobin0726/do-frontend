import Notification from '@/components/images/Notification'
import Search from '@/components/images/Search'
import Link from 'next/link'

export default function ChatPage() {
    const chatRooms = [
        {
            id: 1,
            name: '채팅방 1',
            lastMessage: '안녕하세요!',
            timestamp: '2024-05-22 10:00',
            unreadCount: 2,
            participants: 3,
        },
        {
            id: 2,
            name: '채팅방 2',
            lastMessage: '안녕?',
            timestamp: '2024-05-21 09:30',
            unreadCount: 0,
            participants: 2,
        },
        {
            id: 3,
            name: '채팅방 3',
            lastMessage: '안녕!',
            timestamp: '2023-05-20 08:00',
            unreadCount: 500,
            participants: 5,
        },
    ]
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        const today = new Date()
        const isToday = today.toDateString() === date.toDateString()
        const isThisYear = today.getFullYear() === date.getFullYear()
        if (isToday) {
            return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        } else if (isThisYear) {
            return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
        } else {
            return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric' })
        }
    }

    return (
        <div className=" bg-[#FBFBFD]">
            <header className="bg-white bg-opacity-50 py-4">
                <div className="mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-lg font-bold">채팅</h1>
                    <div className="flex items-center space-x-4">
                        <div className="w-5">
                            <Search />
                        </div>
                        <div className="w-5">
                            <Notification />
                        </div>
                    </div>
                </div>
            </header>
            <main className="mx-auto ">
                <ul>
                    {chatRooms.map((room) => (
                        <Link href={`/chatroom/${room.id}`} key={room.id}>
                            <div className="flex justify-between items-center mb-2 p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#D9D9D9] rounded-full w-14 h-14 flex items-center justify-center text-sm">
                                        프로필
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                            <h2 className="text-lg font-bold">{room.name}</h2>
                                            <p className="text-gray-500 ml-2">{room.participants}</p>
                                            <span className="text-gray-500 text-sm absolute right-4 ">
                                                {formatTimestamp(room.timestamp)}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-gray-700">{room.lastMessage}</p>
                                            {room.unreadCount > 0 && (
                                                <span className="bg-[#F15C45] rounded-lg px-2 py-1 text-white text-sm absolute right-4 ">
                                                    {room.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>
            </main>
        </div>
    )
}
