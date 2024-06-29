import Link from 'next/link'

import Monster3 from '@/components/images/monsters/Monster3'
import HomeUserHobbySwiper from './HomeUserHobbySwiper'
import { HobbyCardType, ProfileType } from '@/type/DataType'

export default function HomeSection1({ hobbyCardsData, profileData}: { hobbyCardsData: HobbyCardType[], profileData: ProfileType}) {

    return (
        <section className="w-full my-[2rem]">
            <div className="w-full flex flex-col justify-end px-8">
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
                    <Link href="/survey?step=1&from=1" passHref scroll={false} className="underline font-bold px-2">
                        <span className="text-black text-[15px]">여기를</span>
                    </Link>
                    눌러주세요!
                </span>
            </div>
            <HomeUserHobbySwiper hobbyCardsData={hobbyCardsData} />
        </section>
    )
}
