'use client'

import Link from 'next/link'

import { useState, useEffect } from 'react'
import { SurveyAnswerData } from '@/lib/SurveyAnswerData'

import ProgressBar from '@/components/common/ProgressBar'
import RightArrow from '@/components/images/RightArrow'
import SurveySubmmit from './SurveySubmmit'

interface SurveyQuestion {
    questionId: number
    question: string
    questionType: string
}

export default function SurveyAnswer({
    surveyQuestions,
    surveyStep,
    surveyFrom,
}: {
    surveyQuestions: SurveyQuestion[]
    surveyStep: number
    surveyFrom: number
}) {
    const [questionId, setQuestionId] = useState<number | null>(null)
    const [questionType, setQuestionType] = useState<string | null>(null)
    const [answer, setAnswer] = useState<number | null>(null)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const handleAnswer = (id: number) => {
        if (answer === id) {
            // 답변을 초기화할 때 sessionStorage에서 삭제
            setAnswer(null)
            if (typeof window !== 'undefined') {
                console.log('clear answer')
                sessionStorage.removeItem(`surveyStep${surveyStep}`)
            }
            setIsDisabled(true)
        } else {
            setAnswer(id)
            setIsDisabled(false)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sessionData = sessionStorage.getItem(`surveyStep${surveyStep}`)
            if (sessionData && JSON.parse(sessionData).answer !== null) {
                const data = JSON.parse(sessionData)
                setQuestionId(data.questionId)
                setQuestionType(data.questionType)
                setAnswer(data.answer)
                setIsDisabled(false)
            } else {
                const currentQuestion = surveyQuestions[surveyStep - 1]
                setQuestionId(currentQuestion.questionId)
                setQuestionType(currentQuestion.questionType)
                setAnswer(null)
                setIsDisabled(true)
            }
        }
    }, [surveyStep, surveyQuestions])

    useEffect(() => {
        if (typeof window !== 'undefined' && questionId !== null && questionType !== null) {
            sessionStorage.setItem(
                `surveyStep${surveyStep}`,
                JSON.stringify({
                    questionId: questionId,
                    questionType: questionType,
                    answer: answer,
                }),
            )
        }
    }, [questionId, questionType, answer, surveyStep])

    return (
        <>
            <section className="w-full h-[25%] flex flex-col justify-center">
                <div className="flex flex-row space-x-2 w-full h-fit justify-center items-center">
                    {SurveyAnswerData.map((data, index) => (
                        <div key={index} className="w-[55px] h-full flex flex-col justify-center items-center">
                            <button
                                className={`rounded-full bg-hobbing-pink
                                ${answer === data.id ? '' : 'opacity-20'}
                                ${data.id === 0 || data.id === 4 ? 'w-[50px] h-[50px]' : data.id === 1 || data.id === 3 ? 'w-[40px] h-[40px]' : 'w-[30px] h-[30px]'}
                                `}
                                onClick={() => handleAnswer(data.id)}
                            ></button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row space-x-2 w-full h-fit justify-center items-center">
                    {SurveyAnswerData.map((data, index) => (
                        <div key={index} className="w-[55px] h-full flex flex-col items-center">
                            {data.answer.split('\n').map((line, idx) => (
                                <p
                                    key={idx}
                                    className={`text-black text-center text-pretty text-[14px] ${data.id === answer ? 'font-bold' : 'font-medium'}`}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
            <section className="w-full h-[25%] space-y-10">
                {surveyStep < surveyQuestions.length ? (
                    <Link href={`/survey?step=${surveyStep + 1}&from=${surveyFrom}`} passHref scroll={false}>
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
                    <SurveySubmmit isDisabled={isDisabled} surveyFrom={surveyFrom} />
                )}
                <ProgressBar step={surveyStep} total={surveyQuestions.length} />
            </section>
        </>
    )
}

//result?from=0로 보내기
