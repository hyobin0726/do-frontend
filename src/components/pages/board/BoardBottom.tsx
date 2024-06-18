'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import Send from '@/components/images/Send'
import { useParams } from 'next/navigation'
import { useState } from 'react'

function BoardBottom() {
    const auth = useGetClientToken()
    const params = useParams<{ boardId: string }>()

    const [message, setMessage] = useState<string>('')
    const handleSendMsg = async () => {
        const trimmedMessage = message.trim()

        if (!trimmedMessage) return

        const bodyData = {
            content: trimmedMessage,
            isInCrew: true,
        }

        try {
            const response = await fetch(
                `${process.env.BASE_URL}/board-service/v1/users/crew/board-interaction/${params.boardId}/comment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Uuid: `${auth.token}`,
                    },
                    body: JSON.stringify(bodyData),
                },
            )

            if (response.ok) {
                console.log('Message sent to server successfully')
            } else {
                console.error('Failed to send message to server', response)
            }
        } catch (error) {
            console.error('Error sending message to server:', error)
        }
        setMessage('')
    }

    return (
        <form className="fixed bottom-0 w-full  z-[100]">
            <div className="flex justify-between items-center px-3 py-2">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    className="flex-grow p-2 rounded-full border border-hobbing-gray focus:outline-none"
                    placeholder="메시지를 입력하세요."
                />
                <button
                    type="button"
                    onClick={() => handleSendMsg()}
                    className="w-9 h-9 bg-hobbing-red rounded-full flex items-center justify-center ml-2"
                >
                    <div className="w-6">
                        <Send />
                    </div>
                </button>
            </div>
        </form>
    )
}


export default BoardBottom
