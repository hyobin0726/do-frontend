'use client'

import { useRouter } from 'next/navigation'

import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import Close from '@/components/images/Close'

export default function SurveyHeader({ surveyFrom, surveyStep }: { surveyFrom: number; surveyStep: number }) {
    // surveyFrom == 0 -> 최초 설문조사 루트
    // surveyFrom == 1 -> 홈>설문조사
    // surveyFrom == 2 -> 마이페이지>설문조사

    // surveyStep == 0 -> 설문조사 시작
    // surveyStep >= 1 && surveyStep <=20 -> 설문조사 진행

    const router = useRouter()

    const handleSessionClear = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.clear()
            const redirectPath = surveyFrom === 2 ? '/mypage' : '/'
            router.push(redirectPath)
        }
    }

    return (
        <header
            className={`${surveyStep == 0 ? 'bg-hobbing-bg-pink' : 'bg-white drop-shadow-sm'} sticky top-0 z-[400]`}
        >
            <nav className="relative w-full h-[60px] flex items-center">
                {surveyFrom == 0 && surveyStep < 2 ? null : surveyFrom == 0 && surveyStep >= 2 ? ( //초기설문조사 시작화면 + 초기설문조사 1번 질문화면
                    //초기설문조사 2번 질문화면 이상
                    <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
                ) : surveyFrom != 0 && surveyStep < 2 ? (
                    //홈>설문조사 시작화면 + 홈>설문조사 1번 질문화면
                    //마이페이지>설문조사 시작화면 + 마이페이지>설문조사 1번 질문화면
                    <div
                        className="z-[10] absolute right-0 h-[60px] w-[50px] flex items-center"
                        onClick={handleSessionClear}
                    >
                        <Close />
                    </div>
                ) : surveyFrom != 0 && surveyStep >= 2 ? (
                    //홈>설문조사 2번 질문화면 이상
                    //마이페이지>설문조사 2번 질문화면 이상
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
                {surveyStep == 0 ? null : (
                    <h1 className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                        설문조사
                    </h1>
                )}
            </nav>
        </header>
    )
}
