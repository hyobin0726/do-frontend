import getHobbyCards from '@/api/survey/getHobbyCards'
import Link from 'next/link'

interface HobbyCard {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export default async function CrewNotFound({ hobbyId }: { hobbyId: number }) {
    const hobbyCard = await getHobbyCards()
    // const hobbyImage = hobbyCard.find((card: HobbyCard) => card.hobbyId === hobbyId)?.imageUrl
    const hobbyImage = 'https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_BELPHEGOR.png'

    return (
        <section className="w-full h-[calc(100%-50px)]">
            <div
                className="w-full h-full bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${hobbyImage})`,
                }}
            >
                <div className="w-full h-full backdrop-blur bg-black/50 flex flex-col justify-center items-center">
                    <div className="w-full h-2/3 flex justify-center items-center">
                        <p className="text-white text-[14px]">해당 취미에 맞는 소모임이 없습니다.</p>
                    </div>
                    <Link
                        href={'/crewcreate'}
                        className="w-1/2 h-[50px] bg-hobbing-red flex justify-center items-center px-5 rounded-full"
                    >
                        <p className="text-white text-[13px]">소모임 만들기</p>
                    </Link>
                </div>
            </div>
        </section>
    )
}
