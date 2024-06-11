'use client'

import { useState } from 'react'

import RightArrow from '@/components/images/RightArrow'
import Alert from '@/components/common/Alert'
import { useRouter } from 'next/navigation'

interface SignupButtonProps {
    name: string
    id: string
    password: string
    phoneNumber: string
    email: string
    gender: string
    birthDate: string
    regionName: string
    regionCode: number
    regionLatitude: number
    regionLongitude: number
    regionRange: number
}

export default function SignupButton({
    name,
    id,
    password,
    phoneNumber,
    email,
    gender,
    birthDate,
    regionName,
    regionCode,
    regionLatitude,
    regionLongitude,
    regionRange,
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

        // 모든 필드가 비어있을 경우
        if (
            !name &&
            !id &&
            !password &&
            !phoneNumber &&
            !email &&
            !gender &&
            !birthDate &&
            !regionName &&
            !regionCode &&
            !regionLatitude &&
            !regionLongitude &&
            !regionRange
        ) {
            setAlertMessage('회원정보와 지역 정보를 모두 입력해주세요.')
            setAlertType('error')
            handleAlert()
            return
        }

        // 회원 정보만 비어있을 경우
        if (!name || !id || !password || !phoneNumber || !email || !gender || !birthDate) {
            setAlertMessage('회원정보를 모두 입력해주세요.')
            setAlertType('warning')
            handleAlert()
            return
        }

        // 지역 정보만 비어있을 경우
        if (!regionName || !regionCode || !regionLatitude || !regionLongitude || !regionRange) {
            setAlertMessage('지역을 선택해주세요.')
            setAlertType('warning')
            handleAlert()
            return
        }

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
            const regionResponse = await fetch(`${process.env.BASE_URL}/crew-service/v1/non-users/region/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uuid: signUpData.data.uuid,
                    addressName: regionName,
                    legalCode: regionCode,
                    latitude: regionLatitude,
                    longitude: regionLongitude,
                    currentSelectedRange: regionRange,
                }),
            })
            const regionData = await regionResponse.json()
            if (regionData.isSuccess === true) {
                setAlertMessage('회원가입이 완료되었습니다.')
                setAlertType('success')
                handleAlert()
                return
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSignUp} className="w-full h-auto">
                <button
                    type="submit"
                    className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                >
                    <p className="font-Pretendard text-white text-[15px] font-bold">회원가입</p>
                    <RightArrow width={15} height={15} />
                </button>
            </form>
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
                                        router.push('/signup?step=1')
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
