'use client'

import React, { useState } from 'react'

import Input from '@/components/common/Input'
import { useSignUpStore } from '@/hooks/useSignUpStore'

export default function SignUpFormStep2() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const { name, id, password, confirmPassword, setName, setId, setPassword, setConfirmPassword } = useSignUpStore()

    return (
        <div className="space-y-3">
            <Input title="이름" required={true} index={1} focusedIndex={focusedIndex}>
                <input
                    id="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => {
                        setFocusedIndex(1)
                    }}
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                />
            </Input>
            <div className="flex flex-row space-x-2">
                <Input title="아이디" required={true} index={2} focusedIndex={focusedIndex}>
                    <input
                        id="id"
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onFocus={() => {
                            setFocusedIndex(2)
                        }}
                        className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                    />
                </Input>
                <button className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3">
                    중복확인
                </button>
            </div>
            <Input title="비밀번호" required={true} index={3} focusedIndex={focusedIndex}>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(3)
                    }}
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                />
            </Input>
            <Input title="비밀번호 확인" required={true} index={4} focusedIndex={focusedIndex}>
                <input
                    id="passwordCheck"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호를 다시 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(4)
                    }}
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                />
            </Input>
        </div>
    )
}
