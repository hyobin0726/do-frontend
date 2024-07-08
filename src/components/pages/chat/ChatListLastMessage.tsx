interface ChatListType {
    crewId: string
    lastChatContent: string
    unreadCount: number
    createdAt: string
}
function ChatListLastMessage() {
    const formatTimestamp = (timestamp: string) => {
        if (!timestamp) return ''
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
        <main>
            <ul>
                {/* {chatList && (
                    <div className=" flex justify-between  w-full">
                        <p className="text-gray-700 truncate flex-1 ">{chatList.lastChatContent}</p>
                        <div className="flex flex-col items-end ml-4">
                            <span className="text-gray-500 text-xs">{formatTimestamp(chatList.createdAt)}</span>
                            {chatList.unreadCount > 0 && (
                                <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs mt-1">
                                    {chatList.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                )} */}
            </ul>
        </main>
    )
}
export default ChatListLastMessage
