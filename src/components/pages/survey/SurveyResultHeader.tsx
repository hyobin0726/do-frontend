import Link from 'next/link'
import Close from '@/components/images/Close'

export default function SurveyResultHeader({ type }: { type: string }) {
    return (
        <header className="bg-white drop-shadow-sm sticky top-0 z-[400]">
            <nav className="relative w-full h-[60px] flex items-center">
                {type == '2' ? (
                    //마이페이지에서 왔을 때
                    <Link
                        href="/mypage"
                        passHref
                        scroll={false}
                        className="z-[10] absolute right-0 h-[60px] w-[50px] flex items-center"
                    >
                        <Close />
                    </Link>
                ) : (
                    //초기 설문조사에서 왔을 때 + 홈으로 리다이렉트
                    <Link
                        href="/"
                        passHref
                        scroll={false}
                        className="z-[10] absolute right-0 h-[60px] w-[50px] flex items-center"
                    >
                        <Close />
                    </Link>
                )}
                <h1 className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                    추천 취미 결과
                </h1>
            </nav>
        </header>
    )
}
