'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

interface SurveyAnswerDataType {
    hobbyQuestionRequestVoList: SurveyAnswer[]
}

interface SurveyAnswer {
    answer: number
    questionId: number
    questionType: string
}

export default async function postSurvey(surveyAnswerData: SurveyAnswerDataType) {
    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/survey/answers`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyAnswerData),
    })
    const data = await res.json()
    return data
}
