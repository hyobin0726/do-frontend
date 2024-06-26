import Link from 'next/link'

import Monster3 from '@/components/images/monsters/Monster3'
import getMyProfile from '@/api/auth/getMyProfile'
import getHobbyCards from '@/api/survey/getHobbyCards'
import HomeUserHobbySwiper from './HomeUserHobbySwiper'

export default async function HomeSection1() {
    const profileData = await getMyProfile()
    const hobbyCardsData = await getHobbyCards()

    return (
        <section className="w-full h-[550px]">
            <div className="w-full h-[150px] flex flex-col justify-end px-8">
                <div className="flex flex-row items-end">
                    <p className="text-black font-extrabold text-[35px] z-[10]">
                        {profileData.name}님의 <br /> 추천취미 Top5!
                    </p>
                    <div className="w-[50px] h-[50px]">
                        <Monster3 />
                    </div>
                </div>
                <span className="text-black text-[15px]">
                    다시 취미를 찾고싶으시려면
                    <Link href="/survey?step=1" passHref scroll={false} className="underline font-bold px-2">
                        <span className="text-black text-[15px]">여기를</span>
                    </Link>
                    눌러주세요!
                </span>
            </div>
            <HomeUserHobbySwiper hobbyCardsData={hobbyCardsData} />
        </section>
    )
}
