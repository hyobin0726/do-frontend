'use client'
import Alert from '@/components/common/Alert'
import React, { useState } from 'react'

export default function BoardContent({ boardContent }: { boardContent: string }) {
    const [text, setText] = useState(boardContent)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value
        if (inputText.length >= 1000) {
            setIsAlertOpen(true)
            return
        }
        setText(inputText)
    }

    return (
        <div className="h-[calc(100vh-15.5rem)]">
            <textarea
                placeholder="멤버들과 공유하고 싶은 소식을 남겨보세요."
                className="w-full h-full p-2"
                value={text}
                onChange={handleChange}
                maxLength={1000}
                name="content"
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
        </div>
    )
}
