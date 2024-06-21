import BasicNextButton from '@/components/common/BasicNextButton'

interface MemberInfomationProps {
    signupinfo: {
        name: string
        phoneNumber: string
        email: string
        gender: string
        birth: string
    }
}

export default function MemberInfomation({ signupinfo }: MemberInfomationProps) {
    const signupInfoArray = [
        { label: '이름', value: signupinfo.name },
        { label: '전화번호', value: signupinfo.phoneNumber },
        { label: '이메일', value: signupinfo.email },
        { label: '성별', value: signupinfo.gender },
        { label: '생년월일', value: signupinfo.birth },
    ]
    return (
        <main className="w-full h-[calc(100dvh-60px)] px-10 flex flex-col items-center">
            <section className="w-full h-[25%] flex flex-col justify-end pb-5">
                <p className="text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                    {signupinfo.name}님의
                    <br />
                    회원가입이 정보입니다
                </p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    가입정보를 변경하시려면 재가입해주세요.
                </p>
            </section>
            <section className="w-full h-[50%] bg-green-200 space-y-3">
                {signupInfoArray.map((info) => (
                    <div
                        key={info.label}
                        className="w-full h-[60px] bg-white border-[1px] border-hobbing-red rounded-lg"
                    >
                        {info.label}: {info.value}
                    </div>
                ))}
            </section>
            <section className="flex justify-center items-center w-full h-[25%]">
                <BasicNextButton path="/mypage" text="확인" theme="red" />
            </section>
        </main>
    )
}
