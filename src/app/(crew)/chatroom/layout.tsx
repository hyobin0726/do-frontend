import ChatBottom from '@/components/pages/chat/ChatBottom'
import ChatRoomNav from '@/components/pages/chat/ChatRoomNav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ChatRoomNav />
            {children}
            <ChatBottom />
        </>
    )
}
