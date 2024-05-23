import ChatBottom from '@/components/pages/chat/ChatBottom'
import ChatMessage from '@/components/pages/chat/ChatMessage'
import ChatRoomNav from '@/components/pages/chat/ChatRoomNav'

export default function ChatRoomPage() {
    return (
        <section>
            <ChatRoomNav />
            <ChatMessage />
            <ChatBottom />
        </section>
    )
}
