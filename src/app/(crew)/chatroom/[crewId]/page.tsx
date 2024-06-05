import ChatMessage from '@/components/pages/chat/ChatMessage'

export default async function ChatRoomPage({ params }: { params: { crewId: string } }) {
    const crewId: string = params.crewId
    console.log('crewId:', crewId)
    return (
        <section>
            <ChatMessage />
        </section>
    )
}
