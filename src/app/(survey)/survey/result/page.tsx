import getHobbyCards from '@/api/survey/getHobbyCards'
import SurveyResult from '@/components/pages/survey/SurveyResult'

export default async function SurveyResultPage() {
    const hobbyCardsData = await getHobbyCards()

    return (
        <main className="w-full h-[calc(100dvh-60px)]">
            <SurveyResult hobbyCardsData={hobbyCardsData} />
        </main>
    )
}
