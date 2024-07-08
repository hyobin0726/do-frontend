import Monster2 from '@/components/images/monsters/Monster2'
import SignUpFormStep2 from './SignUpFormStep2'

export default function SignUpStep2() {
    return (
        <main className="w-[100%] h-dvh" style={{ height: 'calc(100svh - 60px)' }}>
            <section className="relative w-full h-[15%] flex flex-col justify-end pb-5 px-10 overflow-x-clip">
                <div className="w-[130px] h-[130px] absolute -right-10 z-[500]">
                    <Monster2 />
                </div>
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">SIGNUP</p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    나의 취미를 찾기 위한 여행을 시작합니다.
                </p>
            </section>
            <SignUpFormStep2 />
        </main>
    )
}
