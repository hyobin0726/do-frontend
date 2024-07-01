'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import postSurvey from '@/api/survey/postSurvey'
import RightArrow from '@/components/images/RightArrow'
import Loading from '@/components/common/Loading'

interface SessionStorageItems {
    [key: string]: string | any
}

interface SurveyAnswerDataType {
    hobbyQuestionRequestVoList: SurveyAnswer[]
}

interface SurveyAnswer {
    answer: number
    questionId: number
    questionType: string
}

export default function SurveySubmmit({ isDisabled, surveyFrom }: { isDisabled: boolean; surveyFrom: number }) {
    const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswerDataType>({
        hobbyQuestionRequestVoList: [],
    })
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const getAllSessionStorage = (): SessionStorageItems => {
        if (typeof window === 'undefined') {
            return {}
        }
        const storage = window.sessionStorage
        const keys = Object.keys(storage)
        const allItems: SessionStorageItems = {}

        keys.forEach((key) => {
            if (key.startsWith('surveyStep')) {
                // Only include keys starting with 'surveyStep'
                const item = storage.getItem(key)
                try {
                    allItems[key] = item ? JSON.parse(item) : null
                } catch (error) {
                    console.error(`Error parsing JSON for key ${key}:`, error)
                    allItems[key] = item
                }
            }
        })

        return allItems
    }

    const handleSubmmit = () => {
        const allSessionStorageItems = getAllSessionStorage()

        if (Object.values(allSessionStorageItems).length !== 20) {
            alert('설문조사를 완료해주세요')
            return
        }

        const sessionyAnswerArray = Object.values(allSessionStorageItems).filter(
            (item) => item !== null,
        ) as SurveyAnswer[]
        setSurveyAnswers((prev) => ({
            ...prev,
            hobbyQuestionRequestVoList: sessionyAnswerArray,
        }))
    }

    useEffect(() => {
        if (surveyAnswers.hobbyQuestionRequestVoList.length == 20) {
            setLoading(true)
            const postSurveyData = async () => {
                const surveyRes = await postSurvey(surveyAnswers)
                if (surveyRes.isSuccess) {
                    // 성공 시 sessionStorage 초기화 후 결과 페이지로 이동
                    sessionStorage.clear()
                    router.push(`/result?from=${surveyFrom}`)
                } else {
                    // 실패 시 에러 메시지 출력
                    alert(surveyRes.message)
                    sessionStorage.clear()
                    router.push(`/survey?step=1&from=${surveyFrom}`)
                }
                setLoading(false)
            }
            postSurveyData()
        }
    }, [surveyAnswers])

    return (
        <>
            <button
                onClick={handleSubmmit}
                className={`bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8 ${
                    isDisabled ? 'opacity-50' : ''
                }`}
                disabled={isDisabled}
            >
                <p className="text-white text-[15px] font-bold">결과 확인</p>
                <RightArrow width={15} height={15} />
            </button>
            {loading && <Loading />}
        </>
    )
}
