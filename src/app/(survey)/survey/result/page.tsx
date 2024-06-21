import getHobbyCards from '@/api/survey/getHobbyCards'

interface HobbyCardType {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export default async function SurveyResultPage() {
    const hobbyCardsData = await getHobbyCards()
    return (
        <>
            <div>설문조사 결과페이지</div>
            {hobbyCardsData.map((hobbyCard: HobbyCardType) => (
                <div key={hobbyCard.hobbyId}>
                    <p>hobbyName :{hobbyCard.hobbyName}</p>
                    <p>description :{hobbyCard.description}</p>
                    <p>imageUrl :{hobbyCard.imageUrl}</p>
                    <p>fitRate :{hobbyCard.fitRate}</p>
                </div>
            ))}
        </>
    )
}
