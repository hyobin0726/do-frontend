import ChatMessage from '@/components/pages/chat/ChatMessage'
import ChatOldMessage from '@/components/pages/chat/ChatOldMessage'

export default async function ChatRoomPage({ params }: { params: { crewId: string } }) {
    const crewId: string = params.crewId
    console.log('crewId:', crewId)
    return (
        <section className="bg-[#F8F8F8] h-[calc(100dvh-195px)] overflow-y-scroll">
            <div className=" px-2 py-4">
                <ChatOldMessage />
                <ChatMessage />
            </div>
        </section>
    )
}
