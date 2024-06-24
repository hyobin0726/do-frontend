import RightArrow from '@/components/images/RightArrow'
import Link from 'next/link'

export default async function CrewSetting({ params }: { params: { crewId: string } }) {
    const { crewId } = params

    return (
        <main className="w-full flex flex-col items-center space-y-5 py-10 px-5">
            <div className="w-full">
                <Link href={`/crewsetting/${crewId}/info`} passHref>
                    <div className="w-full flex flex-row justify-between items-center shadow-md rounded-lg p-6 text-center border-2 border-hobbing-pink text-hobbing-red  font-medium">
                        <p>소모임 정보</p>
                        <RightArrow width={12} height={12} color="#FF8595" />
                    </div>
                </Link>
            </div>
            <div className="w-full ">
                <Link href={`/crewsetting/${crewId}/member`} passHref>
                    <div className="w-full flex flex-row justify-between items-center shadow-md rounded-lg p-6 text-center border-2 border-hobbing-pink text-hobbing-red font-medium">
                        <p>회원 정보</p>
                        <RightArrow width={12} height={12} color="#FF8595" />
                    </div>
                </Link>
            </div>
            <div className="w-full ">
                <Link href={`/crewsetting/${crewId}/join`} passHref>
                    <div className="w-full flex flex-row justify-between items-center shadow-md rounded-lg p-6 text-center border-2 border-hobbing-pink text-hobbing-red font-medium">
                        <p>가입 신청 내역</p>
                        <RightArrow width={12} height={12} color="#FF8595" />
                    </div>
                </Link>
            </div>
        </main>
    )
}
