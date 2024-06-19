'use client'
import postLogout from '@/api/auth/postLogout'

import { signOut } from 'next-auth/react'
import RightArrow from '@/components/images/RightArrow'

export default function Logout() {
    const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await postLogout()
        if (data) {
            signOut()
        }
    }

    return (
        <form onSubmit={handleSignOut} className="w-full">
            <button type="submit" className="w-full h-full flex flex-row justify-between items-center px-1 py-2">
                <p className="text-[15px]">로그아웃</p>
                <RightArrow width={12} height={12} color="#FF8595" />
            </button>
        </form>
    )
}
