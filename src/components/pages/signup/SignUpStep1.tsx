import BasicNextButton from '@/components/common/BasicNextButton'
import GoogleSignup from './GoogleSignup'
import SquidMonster from '@/components/images/monsters/SquidMonster '

export default function SignUpStep1() {
    return (
        <div className="w-full" style={{ height: 'calc(100vh - 60px)' }}>
            <div className="w-full h-1/6 flex flex-col justify-end pb-5 px-10">
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">SIGNUP</p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    나의 취미를 찾기 위한 여행을 시작합니다.
                </p>
            </div>
            <div className="w-full h-3/6 space-y-5 px-10">
                <BasicNextButton path="/signup?step=2" text="회원가입하기" />
                <GoogleSignup />
            </div>
            <div className="w-full h-2/6 flex overflow-hidden relative">
                <div className="w-full h-5/6 absolute bottom-5 -left-28 ">
                    <SquidMonster />
                </div>
            </div>
        </div>
    )
}
