import HobbieDoLogo from '@/components/images/HobbieDoLogo'
import HOBBINGLogo from '@/components/images/HOBBINGLogo'
import RunMonster from '@/components/images/monsters/RunMonster'
import LoginForm from './LoginForm'
import BasicNextButton from '@/components/common/BasicNextButton'
import GoogleLogin from './GoogleLogin'

export default function MainLogin() {
    return (
        <>
            <div className="w-full h-[35vh] flex flex-col justify-end items-center space-y-2 pb-10">
                <HOBBINGLogo />
                <HobbieDoLogo />
            </div>
            <div className="w-full h-[45vh] flex flex-col justify-center items-center space-y-4">
                <LoginForm />
                <BasicNextButton path="/" text="로그인" />
                <GoogleLogin />
                <div className="w-full flex flex-row justify-around">
                    <p className="font-Pretendard text-[15px] text-[#646464]">ID/PW 찾기</p>
                    <p className="font-Pretendard text-[15px] text-hobbing-red underline underline-offset-4 font-bold">
                        회원가입
                    </p>
                </div>
            </div>
            <div className="w-full h-[20vh] overflow-hidden flex justify-center">
                <RunMonster width={270} height={270} />
            </div>
        </>
    )
}
