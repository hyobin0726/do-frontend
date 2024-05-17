import HOBBINGLogo from '@/components/images/HOBBINGLogo'
import SignupForm from '@/components/pages/signup/SignUpForm'

export default function Signup() {
    return (
        <>
            <div className="w-[100%] h-[100vh] bg-hobbing-bg-pink flex flex-col justify-evenly px-5 items-center">
                <HOBBINGLogo />
                <SignupForm />
            </div>
        </>
    )
}
