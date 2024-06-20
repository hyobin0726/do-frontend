'use client'
import BasicNextButton from '@/components/common/BasicNextButton'
import GoogleSignup from './GoogleSignup'
import SquidMonster from '@/components/images/monsters/SquidMonster '

import { useSignUpStore } from '@/hooks/useSignUpStore'

export default function SignUpStep1() {
    const { setName, setId, setPassword, setConfirmPassword, setPhoneNumber, setEmail, setGender, setBirthDate } =
        useSignUpStore()

    const resetSignUpState = () => {
        setName('')
        setId('')
        setPassword('')
        setConfirmPassword('')
        setPhoneNumber('')
        setEmail('')
        setGender('')
        setBirthDate('')
    }

    return (
        <main className="w-[100%] h-dvh" style={{ height: 'calc(100svh - 60px)' }}>
            <section className="w-full h-[15%] flex flex-col justify-end pb-5 px-10">
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">SIGNUP</p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    나의 취미를 찾기 위한 여행을 시작합니다.
                </p>
            </section>
            <section className="w-full h-[50%] space-y-5 px-10" onClick={() => resetSignUpState()}>
                <BasicNextButton path="/signup?step=2" text="회원가입하기" theme="red" />
                <GoogleSignup />
            </section>
            <section className="w-full h-[35%] flex overflow-hidden relative">
                <div className="w-full h-5/6 absolute bottom-5 -left-28 ">
                    <SquidMonster />
                </div>
            </section>
        </main>
    )
}
