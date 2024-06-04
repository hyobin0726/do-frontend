import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import SignUp from '@/components/pages/signup/SignUp'

export default function SignupPage({ searchParams }: { searchParams: { [key: string]: number } }) {
    const signupStep = Number(searchParams.step)
    return (
        <>
            <div className="w-[100%] h-dvh">
                <div className="w-full h-[60px] flex items-center px-5">
                    <RouterBackArrowButton />
                </div>
                <SignUp signupStep={signupStep} />
            </div>
        </>
    )
}
