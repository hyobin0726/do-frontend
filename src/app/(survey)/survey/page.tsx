import Link from 'next/link'

import getSurveyQuestions from '@/api/survey/getSurveyQuestions'
import ProgressBar from '@/components/common/ProgressBar'

export default async function SurveyPage({ searchParams }: { searchParams: { [key: string]: number } }) {
    const surveyQuestions = await getSurveyQuestions()
    const surveyStep = Number(searchParams.step)

    return (
        <>
            <main className="w-full h-[calc(100dvh-60px)] bg-green-100 px-10">
                <section className="bg-yellow-50 w-full h-[30%]">test</section>
                <section className="bg-yellow-100 w-full h-[50%]">
                    <Link href={`/survey?step=${surveyStep + 1}`}>test</Link>
                </section>
                <section className="bg-yellow-200 w-full h-[20%]">
                    test
                    <ProgressBar step={surveyStep} total={surveyQuestions.data.length} />
                </section>
            </main>
        </>
    )
}
