import getSurveyQuestions from '@/api/survey/getSurveyQuestions'

export default async function SurveyPage({ searchParams }: { searchParams: { [key: string]: number } }) {
    const surveyQuestions = await getSurveyQuestions()
    const surveyStep = Number(searchParams.step)

    // console.log('surveyQuestions : ', surveyQuestions)
    console.log('surveyStep : ', surveyStep)

    return (
        <>
            <main className="w-full h-[calc(100dvh-60px)] bg-green-100 px-10">
                <section className="bg-yellow-50 w-full h-[30%]">test</section>
                <section className="bg-yellow-100 w-full h-[50%]">test</section>
                <section className="bg-yellow-200 w-full h-[20%]">test</section>
            </main>
        </>
    )
}
