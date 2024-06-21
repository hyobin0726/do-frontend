'use client'

import { useState } from 'react'

import RightArrow from '@/components/images/RightArrow'
import Alert from '@/components/common/Alert'
import { useRouter } from 'next/navigation'

interface SignupButtonProps {
    isFormValid: boolean | string
    name: string
    id: string
    password: string
    phoneNumber: string
    email: string
    gender: string
    birthDate: string
    externalId?: string
}

export default function SignupButton({
    isFormValid,
    name,
    id,
    password,
    phoneNumber,
    email,
    gender,
    birthDate,
    externalId,
}: SignupButtonProps) {
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [alertType, setAlertType] = useState<'question' | 'info' | 'error' | 'success' | 'warning'>('question')
    const [alertMessage, setAlertMessage] = useState<string>('')

    const router = useRouter()

    const handleAlert = () => {
        setIsAlertOpen(!isAlertOpen)
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!name || !id || !password || !phoneNumber || !email || !gender || !birthDate) {
            setAlertMessage('회원정보를 모두 입력해주세요.')
            setAlertType('warning')
            handleAlert()
            return
        }
        console.log('회원가입 정보:', name, id, password, phoneNumber, email, gender, birthDate)

        if (externalId) {
            console.log('외부 로그인 정보:', externalId)
            const signUpResponse = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    externalId: externalId,
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    loginId: id,
                    password: password,
                    birth: birthDate,
                }),
            })
            const signUpData = await signUpResponse.json()

            if (signUpData.isSuccess === false) {
                setAlertMessage(signUpData.message)
                setAlertType('error')
                handleAlert()
                return
            } else {
                setAlertMessage('회원가입이 완료되었습니다.')
                setAlertType('success')
                handleAlert()
                return
            }
        } else {
            console.log('일반 로그인 정보:')
            const signUpResponse = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    loginId: id,
                    password: password,
                    birth: birthDate,
                }),
            })
            const signUpData = await signUpResponse.json()

            if (signUpData.isSuccess === false) {
                setAlertMessage(signUpData.message)
                setAlertType('error')
                handleAlert()
                return
            } else {
                setAlertMessage('회원가입이 완료되었습니다.')
                setAlertType('success')
                handleAlert()
                return
            }
        }
    }

    return (
        <>
            <section className="w-full h-[25%] px-10 flex flex-col justify-center items-center">
                <form onSubmit={handleSignUp} className="w-full">
                    <button
                        disabled={!isFormValid}
                        type="submit"
                        className={`${!isFormValid ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
                    >
                        <p className="font-Pretendard text-white text-[15px] font-bold">회원가입</p>
                        <RightArrow width={15} height={15} />
                    </button>
                </form>
            </section>
            {isAlertOpen && (
                <Alert type={alertType} isAlertOpen={isAlertOpen}>
                    {alertType === 'success' ? (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {alertMessage}
                                <br />
                                다시 로그인해주세요.
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        handleAlert()
                                        router.push('/login')
                                    }}
                                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                >
                                    확인
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {alertMessage}
                                <br />
                                다시 시도해주세요.
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        handleAlert()
                                        router.push('/signup')
                                    }}
                                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                >
                                    확인
                                </button>
                            </div>
                        </>
                    )}
                </Alert>
            )}
        </>
    )
}
