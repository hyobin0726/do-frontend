import SignUpStep1 from '@/components/pages/signup/SignUpStep1'
import SignUpStep2 from '@/components/pages/signup/SignUpStep2'

export default function SignUp({ signupStep }: { signupStep: number }) {
    console.log('signupStep = ', signupStep)

    return signupStep === 1 ? <SignUpStep1 /> : signupStep === 2 ? <SignUpStep2 /> : <div>test??</div>
}
