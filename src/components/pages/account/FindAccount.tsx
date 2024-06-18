import BasicNextButton from '@/components/common/BasicNextButton'

export default function FindAccount() {
    return (
        <main className="w-full bg-white" style={{ height: 'calc(100dvh - 60px)' }}>
            <section className="w-full h-[20%] flex flex-col justify-end pb-5 px-10">
                <p className=" font-Pretendard text-[25px] sm:text-[22px] md:text-[27px] font-extrabold">
                    계정을 잊으셨나요?
                </p>
                <p className=" font-Pretendard text-[12px] sm:text-[10px] md:text-[15px] text-[#646464]">
                    아이디 또는 비밀번호를 찾으실 수 있습니다.
                </p>
            </section>
            <section className="w-full h-[80%] space-y-5 px-10 pt-5 ">
                <BasicNextButton path="/account/id" text="아이디 찾기" theme="white" />
                <BasicNextButton path="/account/password" text="비밀번호 찾기" theme="red" />
            </section>
        </main>
    )
}
