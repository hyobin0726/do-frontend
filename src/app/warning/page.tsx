'use client'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function page() {

    const router = useRouter()
    const [title, setTitle] = useState<string>('확인중 입니다...')
    const [txt, setTxt] = useState<string>('...')
   
    useEffect(() => {
        
        const timer = setTimeout(() => {
            setTitle('로그인이 필요합니다.')
            setTxt('로그인 페이지로 이동합니다.')
            router.push('/login')
        }, 2000)
        return () => clearTimeout(timer)
    }, [])
    
  return (
    <section>
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="mt-4 text-lg">{txt}</p>
            </div>
        </div>
    </section>
  )
}

export default page
