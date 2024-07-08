interface SurveyAnswerDataType {
    id: number
    answer: string
    answerRate: number
}

export const SurveyAnswerData: SurveyAnswerDataType[] = [
    {
        id: 0,
        answer: '매우\n아니다',
        answerRate: 0,
    },
    {
        id: 1,
        answer: '아니다',
        answerRate: 1,
    },
    {
        id: 2,
        answer: '보통',
        answerRate: 2,
    },
    {
        id: 3,
        answer: '그렇다',
        answerRate: 3,
    },
    {
        id: 4,
        answer: '매우\n그렇다',
        answerRate: 4,
    },
]
