import Link from 'next/link'

interface HobbyCard {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export default async function CrewNotFound({ hobbies, hobbyId }: { hobbies: HobbyCard[]; hobbyId: number }) {
    const hobbyImageUrl = hobbies.find((hobby: HobbyCard) => hobby.hobbyId === hobbyId)?.imageUrl || ''
    const tempImageUrl = 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png'

    return (
        <section className="w-full h-[calc(100%-55px)]">
            <div
                className="w-full h-full bg-center bg-cover bg-no-repeat "
                style={{
                    backgroundImage: hobbyImageUrl.startsWith('https://hobbiedo-bucket')
                        ? `url(${hobbyImageUrl})`
                        : `url(${tempImageUrl})`,
                    // backgroundImage: `url(${hobbyImageUrl})`,
                }}
            >
                <div className="relative w-full h-full bg-black/30 backdrop-blur-sm">
                    <div className="absolute top-0 w-full h-full flex flex-col items-center px-6">
                        <p className="text-white text-[18px] font-medium text-center h-full flex  items-center">
                            아직 등록된 소모임이 없어요! <br /> 직접 만들어보시겠어요?
                        </p>
                        <Link
                            href={'/crewcreate'}
                            className="absolute bottom-16 w-1/2 h-[50px] bg-hobbing-red flex justify-center items-center px-5 rounded-full"
                        >
                            <p className="text-white text-[15px]">소모임 만들기</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
