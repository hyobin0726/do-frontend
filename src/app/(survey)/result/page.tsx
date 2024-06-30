import { useGetServerToken } from '@/actions/useGetServerToken'

import SurveyResultHeader from '@/components/pages/survey/SurveyResultHeader'

import getHobbyCards from '@/api/survey/getHobbyCards'
import SurveyResult from '@/components/pages/survey/SurveyResult'
import { redirect } from 'next/navigation'

export default async function SurveyResultPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const auth = await useGetServerToken()

    const hobbyCardsData = await getHobbyCards(auth.token)
    const resultType = searchParams.from
    //resultType = 0 -> 초기 설문조사에서 왔을 때
    //resultType = 1 -> 홈에서 왔을 때
    //resultType = 2 -> 마이페이지에서 왔을 때
    //resultType이 0이나 1이 아닐 경우 홈으로 리다이렉트

    if (!resultType || (resultType !== '0' && resultType !== '1' && resultType !== '2')) {
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
