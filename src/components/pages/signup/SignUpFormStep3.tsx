'use client'

import React, { useState, useRef } from 'react'
import Input from '@/components/common/Input'

export default function SignUpFormStep3() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [showEmailAuthInputContainer, setShowEmailAuthInputContainer] = useState<boolean>(false)
    const emailAuthInputRef = useRef<HTMLInputElement>(null)

    const handleEmailAuthButtonClick = () => {
        setShowEmailAuthInputContainer(true)
        setFocusedIndex(3)
        setTimeout(() => {
            emailAuthInputRef.current?.focus()
        }, 0)
    }

    return (
        <div className="space-y-3">
            <Input title="전화번호" required={true} index={1} focusedIndex={focusedIndex}>
                <input
                    id="input"
                    type="tel"
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium"
                    placeholder="전화번호를 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(1)
                    }}
                />
            </Input>
            <div className="flex flex-row space-x-2">
                <Input title="이메일" required={true} index={2} focusedIndex={focusedIndex}>
                    <input
                        id="input"
                        type="email"
                        className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium"
                        placeholder="이메일을 입력해주세요"
                        onFocus={() => {
                            setFocusedIndex(2)
                        }}
                    />
                </Input>
                <button
                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    onClick={handleEmailAuthButtonClick}
                >
                    인증
                </button>
            </div>
            {showEmailAuthInputContainer && (
                <Input index={3} focusedIndex={focusedIndex}>
                    <input
                        ref={emailAuthInputRef}
                        id="input"
                        type="text"
                        className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium"
                        placeholder="인증번호 입력"
                        onFocus={() => {
                            setFocusedIndex(3)
                        }}
                    />
                </Input>
            )}
            <Input title="성별" required={true} index={4} focusedIndex={focusedIndex}>
                <input
                    id="input"
                    type="text"
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium"
                    placeholder="성별을 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(4)
                    }}
                />
            </Input>
            <Input title="생년월일" required={true} index={5} focusedIndex={focusedIndex}>
                <input
                    id="input"
                    type="date"
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium"
                    placeholder="생년월일을 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(5)
                    }}
                />
            </Input>
        </div>
    )
}
