'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProgressBar from '@/components/common/ProgressBar'
import RightArrow from '@/components/images/RightArrow'

interface SurveyQuestion {
    questionId: number
    question: string
    questionType: string
}

export default function SurveyStep({
    surveyQuestions,
    surveyStep,
}: {
    surveyQuestions: SurveyQuestion[]
    surveyStep: number
}) {
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    useEffect(() => {
        // Check if there is a saved answer for the current survey step in sessionStorage
        if (typeof window !== 'undefined') {
            const sessionData = sessionStorage.getItem(`surveyStep${surveyStep}`)
            if (sessionData) {
                const data = JSON.parse(sessionData)
                setIsDisabled(data.answer === null || data.answer === undefined)
            } else {
                setIsDisabled(true)
            }
        }
    }, [surveyStep])

    return (
        <section className="w-full h-[25%] space-y-10">
            {surveyStep < surveyQuestions.length ? (
                <Link href={`/survey?step=${surveyStep + 1}`} passHref scroll={false}>
                    <button
                        disabled={isDisabled}
                        className={`bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8 ${
                            isDisabled ? 'opacity-50' : ''
                        }`}
                    >
                        <p className="text-white text-[15px] font-bold">Next</p>
                        <RightArrow width={15} height={15} />
                    </button>
                </Link>
            ) : (
                <button
                    className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                    disabled={isDisabled}
                >
                    <p className="text-white text-[15px] font-bold">결과 확인</p>
                    <RightArrow width={15} height={15} />
                </button>
            )}
            <ProgressBar step={surveyStep} total={surveyQuestions.length} />
        </section>
    )
}
