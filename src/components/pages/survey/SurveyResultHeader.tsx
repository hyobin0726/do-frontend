import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import Link from 'next/link'
import BackArrow from '@/components/images/BackArrow'

export default function SurveyResultHeader({ type }: { type: string }) {
    console.log(type)
    return (
        <header className="bg-white drop-shadow-sm sticky top-0 z-[400]">
            <nav className="relative w-full h-[60px] flex items-center">
                {type == '1' ? (
                    //마이페이지에서 왔을 때
                    <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
                ) : (
                    //설문조사에서 왔을 때
                    <Link
                        href="/"
                        passHref
                        scroll={false}
                        className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center"
                    >
                        <BackArrow />
                    </Link>
                )}
                <h1 className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                    추천 취미 결과
                </h1>
            </nav>
        </header>
    )
}
