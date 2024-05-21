import SignUpStep1 from '@/components/pages/signup/SignUpStep1'
import SignUpStep2 from '@/components/pages/signup/SignUpStep2'
import SignUpStep3 from '@/components/pages/signup/SignUpStep3'

export default function SignUp({ signupStep }: { signupStep: number }) {
    return signupStep === 1 ? (
        <SignUpStep1 />
    ) : signupStep === 2 ? (
        <SignUpStep2 />
    ) : signupStep === 3 ? (
        <SignUpStep3 />
    ) : (
        <div>test??</div>
    )
}
