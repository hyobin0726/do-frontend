import ChatNav from '@/components/pages/chat/ChatNav'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ChatNav />
            {children}
        </>
    )
}
