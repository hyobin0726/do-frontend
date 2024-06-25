import Link from 'next/link'

import FuunnyMonster from '@/components/images/monsters/FuunnyMonster'
import getMyProfile from '@/api/auth/getMyProfile'
import getHobbyCards from '@/api/survey/getHobbyCards'
import HomeUserHobbySwiper from './HomeUserHobbySwiper'

export default async function HomeSection1() {
    const profileData = await getMyProfile()
    const hobbyCardsData = await getHobbyCards()

    return (
        <>
            <section className="w-full h-[70dvh] space-y-5">
                <div className="w-full h-auto flex flex-col justify-end px-8 pt-10">
                    <div className="flex flex-row items-end">
                        <p className="text-black font-extrabold text-[35px] z-[10]">
                            {profileData.name}님의 <br /> 추천취미 Top5!
                        </p>
                        <div className="w-[50px] h-[50px]">
                            <FuunnyMonster />
                        </div>
                    </div>
                    <span className="text-black text-[15px] z-[10]">
                        다시 취미를 찾고싶으시려면
                        <Link href="/survey" className="underline font-bold px-2">
                            <span className="text-black text-[15px]">여기를</span>
                        </Link>
                        눌러주세요!
                    </span>
                </div>
                <HomeUserHobbySwiper hobbyCardsData={hobbyCardsData} />
            </section>
        </>
    )
}
