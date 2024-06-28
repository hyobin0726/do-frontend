'use client'

import { useRouter } from 'next/navigation'

import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import Close from '@/components/images/Close'

export default function SurveyHeader({ surveyFrom, surveyStep }: { surveyFrom: number; surveyStep: number }) {
    // surveyFrom == 0 -> 최초 설문조사 루트
    // surveyFrom == 1 -> 홈>설문조사
    // surveyFrom == 2 -> 마이페이지>설문조사

    const router = useRouter()

    const handleSessionClear = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.clear()
            const redirectPath = surveyFrom === 2 ? '/mypage' : '/'
            router.push(redirectPath)
        }
    }

    return (
        <header className="bg-white drop-shadow-sm sticky top-0 z-[400]">
            <nav className="relative w-full h-[60px] flex items-center">
                {surveyFrom == 0 && surveyStep == 1 ? null : surveyFrom == 0 && surveyStep != 1 ? (
                    <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
                ) : surveyFrom != 0 && surveyStep == 1 ? (
                    <div
                        className="z-[10] absolute right-0 h-[60px] w-[50px] flex items-center"
                        onClick={handleSessionClear}
                    >
                        <Close />
                    </div>
                ) : surveyFrom != 0 && surveyStep != 1 ? (
                    <>
                        <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
                        <div
                            className="z-[10] absolute right-0 h-[60px] w-[50px] flex items-center"
                            onClick={handleSessionClear}
                        >
                            <Close />
                        </div>
                    </>
                ) : null}
                <h1 className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                    설문조사
                </h1>
            </nav>
        </header>
    )
}
