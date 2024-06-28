'use client'
import { PostComment } from '@/api/board/postComment'
import Send from '@/components/images/Send'
import { useParams } from 'next/navigation'
import { useState } from 'react'

function BoardBottom() {
    const params = useParams<{ boardId: string }>()

    const [message, setMessage] = useState<string>('')

    const handleSendMsg = async () => {
        const trimmedMessage = message.trim()

        if (!trimmedMessage) return

        const bodyData = {
            content: trimmedMessage,
        }

        const result = await PostComment(params.boardId, bodyData)
        if (result && result.isSuccess) {
            console.log('댓글 작성 완료')
            setMessage('')
        } else {
            console.error('댓글 작성 실패:', result)
        }
    }

    return (
        <form className="fixed bottom-0 w-full z-[1000] h-[80px]  bg-white ">
            <div className="flex justify-between items-center p-2">
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
