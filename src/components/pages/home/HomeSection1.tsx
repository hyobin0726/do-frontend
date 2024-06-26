import getMyProfile from '@/api/auth/getMyProfile'
import Link from 'next/link'

export default async function HomeSection1() {
    const profileData = await getMyProfile()
    return (
        <>
            <section className="absolute top-0  w-full h-[60dvh] bg-hobbing-red px-10 py-5">
                <div className="w-full h-[30%] flex flex-col justify-center ">
                    <p className="text-white font-bold text-[28px]">
                        {profileData.name}님의 <br /> 추천취미 Top5!
                    </p>
                    <span className="text-white text-[15px]">
                        다시 취미를 찾고싶으시면
                        <Link href="/mypage/edit" className="underline font-bold">
                            <span className="text-white text-[15px]"> 여기를 </span>
                        </Link>
                        눌러주세요!
                    </span>
                </div>
                <div className="w-full h-[60%] flex items-center">취미리스트 section</div>
            </section>
        </>
    )
}
