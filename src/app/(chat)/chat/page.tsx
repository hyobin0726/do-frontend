import ChatBottom from '@/components/pages/ChatBottom'
import ChatMessage from '@/components/pages/ChatMessage'
import ChatNav from '@/components/pages/ChatNav'

export default function ChatPage() {
    return (
        <section>
            <ChatNav />
            <ChatMessage />
            <ChatBottom />
        </section>
    )
}
