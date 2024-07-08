'use client'

import GoogleLogo from '@/components/images/GoogleLogo'
import RightArrow from '@/components/images/RightArrow'
import { signIn } from 'next-auth/react'

export default function GoogleSignup() {
    return (
        <div
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="bg-white h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8 drop-shadow-md"
        >
            <div className="flex flex-row space-x-2">
                <GoogleLogo />
                <p className="font-Pretendard text-[#757575] text-[15px] font-bold">구글 회원가입</p>
            </div>
            <RightArrow width={15} height={15} color={'#757575'} />
        </div>
    )
}
