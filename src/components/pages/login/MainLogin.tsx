import React, { Suspense } from 'react'
import Link from 'next/link'

import HOBBINGLogo from '@/components/images/HOBBINGLogo'
import RunMonster from '@/components/images/monsters/RunMonster'
import LoginForm from './LoginForm'
import GoogleLogin from './GoogleLogin'

export default function MainLogin({ loginError }: { loginError: boolean }) {
    return (
        <>
            <section className="w-full h-[30svh] flex justify-center items-end">
                <div className="w-1/2 h-1/2 mb-10">
                    <HOBBINGLogo />
                </div>
            </section>
            <section className="w-full h-[50svh] flex flex-col justify-start items-center space-y-4">
                <LoginForm loginError={loginError} />
                <GoogleLogin />
                <div className="w-full h-[10%] flex flex-row justify-evenly">
                    <Link href="/account" className="w-[40%] flex justify-center items-center">
                        <p className="font-Pretendard text-[15px] text-[#646464]">ID/PW 찾기</p>
                    </Link>
                    <Link href="/signup" className="w-[40%] flex justify-center items-center">
                        <p className="font-Pretendard text-[15px] text-hobbing-red underline underline-offset-4 font-bold">
                            회원가입
                        </p>
                    </Link>
                </div>
            </section>
            <section className="w-full h-[20svh] overflow-hidden flex justify-center relative">
                <div className="w-full h-full absolute -bottom-10">
                    <RunMonster />
                </div>
            </section>
        </>
    )
}
