'use client'

import React, { useState } from 'react'

import DeleteCircle from '@/components/images/DeleteCircle'
import BasicNextButton from '@/components/common/BasicNextButton'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
    const [inputId, setInputId] = useState<string>('')
    const [inputPassword, setInputPassword] = useState<string>('')

    const router = useRouter()

    const handleLogin = async () => {
        const res = await signIn('credentials', {
            loginId: inputId,
            password: inputPassword,
        })

        if (!res?.ok) {
            // 로그인 실패 시
            alert(`로그인에 실패하였습니다. 다시 시도해주세요. (error:${res})`)
        } else {
            // 로그인 성공 시
            router.push('/')
        }
    }

    return (
        <>
            <form className="w-full h-[120px] divide-y divide-inherit">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="ID"
                        onChange={(e) => setInputId(e.target.value)}
                        value={inputId}
                        className="bg-white w-full h-[60px] rounded-t-xl pl-5 pr-[50px] font-Pretendard text-[15px] caret-hobbing-red focus:outline-none"
                    />
                    <div
                        onClick={() => setInputId('')}
                        className="absolute h-[60px] w-[50px] top-0 right-0 flex justify-center items-center"
                    >
                        <DeleteCircle width={30} height={30} />
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setInputPassword(e.target.value)}
                        value={inputPassword}
                        className="bg-white w-full h-[60px] rounded-b-xl pl-5 pr-[50px] font-Pretendard text-[15px] caret-hobbing-red focus:outline-none"
                    />
                    <div
                        onClick={() => setInputPassword('')}
                        className="absolute h-[60px] w-[50px] top-0 right-0 flex justify-center items-center"
                    >
                        <DeleteCircle width={30} height={30} />
                    </div>
                </div>
            </form>

            <div onClick={handleLogin}>
                <BasicNextButton text="로그인" theme="red" />
            </div>
        </>
    )
}
