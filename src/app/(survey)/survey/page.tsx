import getSurveyQuestions from '@/api/survey/getSurveyQuestions'

export default async function SurveyPage({ searchParams }: { searchParams: { [key: string]: number } }) {
    const surveyQuestions = await getSurveyQuestions()
    const surveyStep = Number(searchParams.step)

    // console.log('surveyQuestions : ', surveyQuestions)
    console.log('surveyStep : ', surveyStep)

    return (
        <>
            <main className="w-full h-[calc(100dvh-60px)] bg-green-100">
                <div>test</div>
            </main>
        </>
    )
}
