'use client'
import Alert from '@/components/common/Alert'
import React, { useState } from 'react'

export default function BoardContent({ contents }: { contents: (content: string) => void }) {
    const [text, setText] = useState('')
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value
        if (inputText.length > 1000) {
            setIsAlertOpen(true)
            return
        }
        setText(inputText)
        contents(inputText)
    }

    return (
        <form className="h-[calc(100vh-13rem)]">
            <textarea
                placeholder="멤버들과 공유하고 싶은 소식을 남겨보세요."
                className="w-full h-full p-4"
                value={text}
                onChange={handleChange}
            />
            {isAlertOpen && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                        게시글은 1000자까지 작성 가능합니다.
                    </p>
                    <button
                        onClick={() => {
                            setIsAlertOpen(false)
                        }}
                        className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    >
                        닫기
                    </button>
                </Alert>
            )}
        </form>
    )
}
