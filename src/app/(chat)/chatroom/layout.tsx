import ChatBottom from '@/components/pages/chat/ChatBottom'
import ChatRoomNav from '@/components/pages/chat/ChatRoomNav'
import { SocketProvider } from '@/providers/SocketProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SocketProvider>
                <ChatRoomNav />
                {children}
                <ChatBottom />
            </SocketProvider>
        </>
    )
}
