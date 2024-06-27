import { redirect } from 'next/navigation'

import getSurveyQuestions from '@/api/survey/getSurveyQuestions'

import SurveyQuestions from '@/components/pages/survey/SurveyQuestions'
import SurveyAnswer from '@/components/pages/survey/SurveyAnswer'

export default async function SurveyPage({ searchParams }: { searchParams: { [key: string]: number } }) {
    const surveyQuestions = await getSurveyQuestions()
    const surveyStep = Number(searchParams.step)

    if (!surveyStep || surveyStep < 1 || surveyStep > surveyQuestions.data.length) {
        //이상경로 차단 + 답변 초기화
        redirect('/survey?step=1')
    }

    return (
        <>
            <main className="w-full h-[calc(100dvh-60px)] px-8">
                <SurveyQuestions surveyQuestions={surveyQuestions.data} surveyStep={surveyStep} />
                <SurveyAnswer surveyQuestions={surveyQuestions.data} surveyStep={surveyStep} />
            </main>
        </>
    )
}
