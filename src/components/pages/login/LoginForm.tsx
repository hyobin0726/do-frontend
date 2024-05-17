'use client'

import React, { useState } from 'react'

import DeleteCircle from '@/components/images/DeleteCircle'

export default function LoginForm() {
    const [inputId, setInputId] = useState<string>('')
    const [inputPassword, setInputPassword] = useState<string>('')

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
                        className="bg-white w-full h-[60px] rounded-b-xl pl-5 font-Pretendard text-[15px] 
                            caret-hobbing-red focus:outline-none"
                    />
                    <div
                        onClick={() => setInputPassword('')}
                        className="absolute h-[60px] w-[50px] top-0 right-0 flex justify-center items-center"
                    >
                        <DeleteCircle width={30} height={30} />
                    </div>
                </div>
            </form>
        </>
    )
}
