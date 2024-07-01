import { useGetServerToken } from '@/actions/useGetServerToken'

import getSurveyQuestions from '@/api/survey/getSurveyQuestions'

import SurveyStart from '@/components/pages/survey/SurveyStart'
import SurveyMain from '@/components/pages/survey/SurveyMain'

export default async function SurveyPage({ searchParams }: { searchParams: { [key: string]: number } }) {
    const auth = await useGetServerToken()

    const surveyQuestions = await getSurveyQuestions(auth.token)
    console.log('surveyQuestions', surveyQuestions)

    const surveyStep = Number(searchParams.step)
    const surveyFrom = Number(searchParams.from)

    return (
        <>
            {surveyStep === 0 ? (
                <SurveyStart surveyFrom={surveyFrom} surveyQuestions={surveyQuestions.data} />
            ) : (
                <SurveyMain surveyStep={surveyStep} surveyFrom={surveyFrom} />
            )}
        </>
    )
}
