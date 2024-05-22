'use client'

import React, { useState, useRef } from 'react'

import Input from '@/components/common/Input'
import { useSignUpStore } from '@/hooks/useSignUpStore'

export default function SignUpFormStep3() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [showEmailAuthInputContainer, setShowEmailAuthInputContainer] = useState<boolean>(false)
    const [emailAuthNumber, setEmailAuthNumber] = useState<string>('')
    const emailAuthInputRef = useRef<HTMLInputElement>(null)

    const { phoneNumber, setPhoneNumber, email, setEmail, gender, setGender, birthDate, setBirthDate } =
        useSignUpStore()

    const handleEmailAuthButtonClick = () => {
        setShowEmailAuthInputContainer(true)
        setFocusedIndex(3)
        setTimeout(() => {
            emailAuthInputRef.current?.focus()
        }, 0)
    }

    return (
        <div className="space-y-3">
            <Input
                title="전화번호"
                required={true}
                index={1}
                focusedIndex={focusedIndex}
                id="phone"
                type="tel"
                placeholder="전화번호를 입력해주세요"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => {
                    setFocusedIndex(1)
                }}
            />
            <div className="flex flex-row space-x-2">
                <Input
                    title="이메일"
                    required={true}
                    index={2}
                    focusedIndex={focusedIndex}
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => {
                        setFocusedIndex(2)
                    }}
                />
                <button
                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    onClick={handleEmailAuthButtonClick}
                >
                    인증
                </button>
            </div>
            {showEmailAuthInputContainer && (
                <Input
                    index={3}
                    focusedIndex={focusedIndex}
                    id="emailAuth"
                    type="text"
                    placeholder="인증번호 입력"
                    value={emailAuthNumber}
                    onChange={(e) => setEmailAuthNumber(e.target.value)}
                    onFocus={() => {
                        setFocusedIndex(3)
                    }}
                    ref={emailAuthInputRef}
                />
            )}
            <Input
                title="성별"
                required={true}
                index={4}
                focusedIndex={focusedIndex}
                id="gender"
                type="text"
                placeholder="성별을 입력해주세요"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onFocus={() => {
                    setFocusedIndex(4)
                }}
            />
            <Input
                title="생년월일"
                required={true}
                index={5}
                focusedIndex={focusedIndex}
                id="birthDate"
                type="date"
                placeholder="생년월일을 입력해주세요"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                onFocus={() => {
                    setFocusedIndex(5)
                }}
            />
        </div>
    )
}
