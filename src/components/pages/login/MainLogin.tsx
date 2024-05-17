import HobbieDoLogo from '@/components/images/HobbieDoLogo'
import HOBBINGLogo from '@/components/images/HOBBINGLogo'
import RunMonster from '@/components/images/monsters/RunMonster'
import LoginForm from './LoginForm'

export default function MainLogin() {
    return (
        <>
            <div className="w-full h-[35vh] flex flex-col justify-end items-center space-y-2 pb-10">
                <HOBBINGLogo />
                <HobbieDoLogo />
            </div>
            <div className="w-full h-[45vh]  flex flex-col justify-around items-center">
                <LoginForm />
                <div>로그인버튼</div>
                <div>구글 로그인 버튼</div>
                <div>아이디비번찾기 + 회원가입</div>
            </div>
            <div className="w-full h-[20vh] overflow-hidden flex justify-center">
                <RunMonster width={270} height={270} />
            </div>
        </>
    )
}
