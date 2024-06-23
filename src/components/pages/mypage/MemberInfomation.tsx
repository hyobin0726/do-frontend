import BasicNextButton from '@/components/common/BasicNextButton'
import MemberInfo from '@/components/images/MemberInfo'

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
    // 전화번호를 010-0000-0000 형식으로 변환하는 함수
    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '')
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/)
        if (match) {
            return `${match[1]} - ${match[2]} - ${match[3]}`
        }
        return phoneNumber
    }

    const signupInfoArray = [
        { label: '이름', infotype: 'name', value: signupinfo.name },
        { label: '전화번호', infotype: 'phoneNumber', value: formatPhoneNumber(signupinfo.phoneNumber) },
        { label: '이메일', infotype: 'email', value: signupinfo.email },
        { label: '성별', infotype: 'gender', value: signupinfo.gender },
        { label: '생년월일', infotype: 'birth', value: signupinfo.birth },
    ]
    return (
        <main className="w-full h-[calc(100dvh-60px)] px-10 flex flex-col items-center">
            <section className="w-full h-[25%] flex flex-col justify-end">
                <p className="text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                    {signupinfo.name}님의
                    <br />
                    회원가입이 정보입니다
                </p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    가입정보를 변경하시려면 재가입해주세요.
                </p>
            </section>
            <section className="w-full h-[55%] space-y-4 flex flex-col justify-center items-center">
                {signupInfoArray.map((info) => (
                    <div
                        key={info.label}
                        className="w-[95%] h-[55px] border-b-[1px] border-hobbing-red flex items-center px-4 space-x-4"
                    >
                        <div className="w-auto h-1/3">
                            <MemberInfo infoType={info.infotype} />
                        </div>
                        <p className="text-[15px] sm:text-[13px] md:text-[17px]">{info.value}</p>
                    </div>
                ))}
            </section>
            <section className="flex justify-center items-center w-full h-[20%]">
                <BasicNextButton path="/mypage" text="확인" theme="red" />
            </section>
        </main>
    )
}
