import SignUpStep1 from '@/components/pages/signup/SignUpStep1'

export default function SignUp({ signupStep }: { signupStep: number }) {
    console.log('signupStep = ', signupStep)

    return <>{signupStep === 1 ? <SignUpStep1 /> : <div>test??</div>}</>
}
