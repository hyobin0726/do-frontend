import SurveyResultHeader from '@/components/pages/survey/SurveyResultHeader'

import getHobbyCards from '@/api/survey/getHobbyCards'
import SurveyResult from '@/components/pages/survey/SurveyResult'
import { redirect } from 'next/navigation'

export default async function SurveyResultPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const hobbyCardsData = await getHobbyCards()
    const resultType = searchParams.from

    if (!resultType || (resultType !== '0' && resultType !== '1')) {
        redirect('/result?from=0')
    }

    return (
        <>
            <SurveyResultHeader type={resultType} />
            <main className="w-full h-[calc(100dvh-60px)]">
                <SurveyResult hobbyCardsData={hobbyCardsData} />
            </main>
        </>
    )
}
