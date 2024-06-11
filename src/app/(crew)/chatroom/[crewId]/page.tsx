import ChatMessage from '@/components/pages/chat/ChatMessage'
import ChatOldMessage from '@/components/pages/chat/ChatOldMessage'

async function ConnectionChat(crewId: string) {
    const BodyData = {
        crewId: `${crewId}`,
        connectionStatus: true,
    }

    try {
        const response = await fetch(`${process.env.BASE_URL}/chat-service/v1/users/chat/connection`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Uuid: 'uuid1',
            },
            body: JSON.stringify(BodyData),
            cache: 'no-cache',
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        console.log('data:', data)
        return data
    } catch (error) {
        console.error('Failed to connect to chat:', error)
        throw error
    }
}

export default async function ChatRoomPage({ params }: { params: { crewId: string } }) {
    const crewId: string = params.crewId
    await ConnectionChat(crewId)
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
