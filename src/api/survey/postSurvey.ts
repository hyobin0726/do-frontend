'use server'

import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function postSurvey() {
    const surveyData = {
        hobbyQuestionRequestVoList: [
            {
                questionId: 60,
                questionType: 'JUDGING_FUNCTION',
                answer: 0,
            },
            {
                questionId: 45,
                questionType: 'JUDGING_FUNCTION',
                answer: 0,
            },
            {
                questionId: 11,
                questionType: 'ENERGY_DIRECTION',
                answer: 0,
            },
            {
                questionId: 13,
                questionType: 'ENERGY_DIRECTION',
                answer: 0,
            },
            {
                questionId: 71,
                questionType: 'LIFESTYLE',
                answer: 1,
            },
            {
                questionId: 35,
                questionType: 'PERCEIVING_FUNCTION',
                answer: 1,
            },
            {
                questionId: 73,
                questionType: 'LIFESTYLE',
                answer: 1,
            },
            {
                questionId: 19,
                questionType: 'ENERGY_DIRECTION',
                answer: 1,
            },
            {
                questionId: 36,
                questionType: 'PERCEIVING_FUNCTION',
                answer: 1,
            },
            {
                questionId: 4,
                questionType: 'ENERGY_DIRECTION',
                answer: 2,
            },
            {
                questionId: 68,
                questionType: 'LIFESTYLE',
                answer: 2,
            },
            {
                questionId: 48,
                questionType: 'JUDGING_FUNCTION',
                answer: 2,
            },
            {
                questionId: 50,
                questionType: 'JUDGING_FUNCTION',
                answer: 2,
            },
            {
                questionId: 9,
                questionType: 'ENERGY_DIRECTION',
                answer: 2,
            },
            {
                questionId: 24,
                questionType: 'PERCEIVING_FUNCTION',
                answer: 4,
            },
            {
                questionId: 8,
                questionType: 'ENERGY_DIRECTION',
                answer: 4,
            },
            {
                questionId: 41,
                questionType: 'JUDGING_FUNCTION',
                answer: 4,
            },
            {
                questionId: 77,
                questionType: 'LIFESTYLE',
                answer: 4,
            },
            {
                questionId: 12,
                questionType: 'ENERGY_DIRECTION',
                answer: 4,
            },
            {
                questionId: 29,
                questionType: 'PERCEIVING_FUNCTION',
                answer: 4,
            },
        ],
    }

    const auth = await useGetServerToken()

    const res = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/survey/answers`, {
        method: 'POST',
        headers: {
            Authorization: `${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
    })
    const data = await res.json()
    // console.log('data :', data)
    return data
}
