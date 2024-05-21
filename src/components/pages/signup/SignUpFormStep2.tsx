'use client'

import React, { useState } from 'react'

import Input from '@/components/common/Input'

export default function SignUpFormStep2() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    return (
        <div className="space-y-3">
            <Input title="이름" required={true} index={1} focusedIndex={focusedIndex}>
                <input
                    id="name"
                    type="text"
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                    placeholder="이름을 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(1)
                    }}
                />
            </Input>
            <div className="flex flex-row space-x-2">
                <Input title="아이디" required={true} index={2} focusedIndex={focusedIndex}>
                    <input
                        id="id"
                        type="text"
                        className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                        placeholder="아이디를 입력해주세요"
                        onFocus={() => {
                            setFocusedIndex(2)
                        }}
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
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                    placeholder="비밀번호를 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(3)
                    }}
                />
            </Input>
            <Input title="비밀번호 확인" required={true} index={4} focusedIndex={focusedIndex}>
                <input
                    id="passwordCheck"
                    type="password"
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                    placeholder="비밀번호를 다시 입력해주세요"
                    onFocus={() => {
                        setFocusedIndex(4)
                    }}
                />
            </Input>
        </div>
    )
}
