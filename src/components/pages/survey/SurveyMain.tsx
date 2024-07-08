'use client'

import { useState, useEffect } from 'react'

import SurveyHeader from '@/components/pages/survey/SurveyHeader'
import SurveyQuestions from '@/components/pages/survey/SurveyQuestions'
import SurveyAnswer from './SurveyAnswer'

interface surveyQuestions {
    questionId: number
    question: string
    questionType: string
}

export default function SurveyMain({ surveyStep, surveyFrom }: { surveyStep: number; surveyFrom: number }) {
    const [surveyQuestions, setSurveyQuestions] = useState<surveyQuestions[]>([])
    const [questions, setQuestions] = useState<surveyQuestions>({ questionId: 0, question: '', questionType: '' })

    useEffect(() => {
        const sessionSurveyQuestions = sessionStorage.getItem('surveyQuestions')
        if (sessionSurveyQuestions) {
            const questions = JSON.parse(sessionSurveyQuestions)
            setSurveyQuestions(questions)
        }
    }, [])

    useEffect(() => {
        if (surveyQuestions.length > 0) {
            setQuestions(surveyQuestions[surveyStep - 1])
        }
    }, [surveyQuestions, surveyStep])

    return (
        <>
            <SurveyHeader surveyFrom={surveyFrom} surveyStep={surveyStep} />

            <main className="w-full h-[calc(100dvh-60px)] px-8">
                <SurveyQuestions surveyStep={surveyStep} surveyQuestions={questions} />
                <SurveyAnswer surveyStep={surveyStep} surveyFrom={surveyFrom} surveyQuestions={questions} />
            </main>
        </>
    )
}
