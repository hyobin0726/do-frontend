'use client'

import RouterBackArrowButton from './RouterBackArrowButton'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageHeader() {
    const pathname = usePathname()

    const [myTitle, setMyTitle] = useState<string>('')
    useEffect(() => {
        ///account
        if (pathname === '/account') {
            setMyTitle('내계정 찾기')
        } else if (pathname === '/account/password') {
            setMyTitle('비밀번호 찾기')
        } else if (pathname === '/account/id') {
            setMyTitle('아이디 찾기')
        }
        // signup
        else if (pathname === '/signup') {
            setMyTitle('회원가입')
        }
        // mypage
        else if (pathname === '/mypage/region/initial') {
            setMyTitle('활동지역 등록')
        } else if (/^\/chatimglist\/\d+/.test(pathname)) {
            setMyTitle('사진첩')
        } else if (pathname === '/mypage/crew-apply') {
            setMyTitle('소모임 가입신청 확인')
        } else if (pathname === '/mypage/edit') {
            setMyTitle('프로필 수정')
        } else if (pathname === '/mypage/infomation') {
            setMyTitle('가입정보')
        } else if (pathname === '/mypage/password-reset') {
            setMyTitle('비밀번호 변경')
        } else if (pathname === '/mypage/region') {
            setMyTitle('활동지역 관리')
        }
        //survey
        else if (pathname === '/survey/result') {
            setMyTitle('설문조사 결과')
        }
        //crew
        else if (pathname === '/crewcreate') {
            setMyTitle('소모임 만들기')
        }
        //default
        else {
            setMyTitle('')
        }
    }, [pathname])

    return (
        <header className="bg-white drop-shadow-sm sticky top-0 z-[400]">
            <nav className="relative w-full h-[60px] flex items-center">
                <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
                <h1 className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                    {myTitle}
                </h1>
            </nav>
        </header>
    )
}
