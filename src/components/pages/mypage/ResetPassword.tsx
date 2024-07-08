'use client'

import z from 'zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordSchemas } from '@/schemas/ResetPasswordSchemas'
import { useGetClientToken } from '@/actions/useGetClientToken'

import Input from '@/components/common/Input'
import Alert from '@/components/common/Alert'
import VisibilityOn from '@/components/images/VisibilityOn'
import VisibilityOff from '@/components/images/VisibilityOff'
import { signOut } from 'next-auth/react'

type ResetPasswordType = z.infer<typeof ResetPasswordSchemas>

export default function ResetPassword() {
    const [prevPassword, setPrevPassword] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [getIdIsSuccess, setGetIdIsSuccess] = useState<boolean>(false)
    const [getIdMessage, setGetIdMessage] = useState<string>('')

    const auth = useGetClientToken()

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm<ResetPasswordType>({
        resolver: zodResolver(ResetPasswordSchemas),
        defaultValues: {
            password,
            confirmPassword,
        },
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof ResetPasswordType) => {
        const { value } = e.target
        switch (name) {
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                setConfirmPassword(value)
                break
        }
        register(name).onChange(e)
        trigger(name)
    }

    const onfocus = (index: number, name: keyof ResetPasswordType) => {
        setFocusedIndex(index)
        trigger(name)
    }

    const GetPasswordOnEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/users/password`, {
            method: 'PATCH',
            headers: {
                Authorization: auth.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword: prevPassword,
                newPassword: password,
            }),
        })
        const data = await res.json()
        setGetIdIsSuccess(data.isSuccess)
        setGetIdMessage(data.message)
        setIsAlertOpen(true)
    }

    const isFormValid = !Object.values(errors).some(Boolean) && prevPassword && password && confirmPassword

    return (
        <>
            <main className="px-10 w-full bg-white" style={{ height: 'calc(100svh - 60px)' }}>
                <section className="w-full h-[20%] flex flex-col justify-end pb-10">
                    <p className="text-[15px] sm:text-[13px] md:text-[17px] text-black font-medium">
                        기존 비밀번호와
                        <br />
                        새로운 비밀번호를 입력해주세요.
                    </p>
                </section>
                <section className="w-full h-[60%] space-y-3">
                    <Input
                        title="이전 비밀번호"
                        required={true}
                        index={1}
                        focusedIndex={focusedIndex}
                        id="prevPassword"
                        name="prevPassword"
                        type="password"
                        placeholder="이전 비밀번호를 입력해주세요"
                        value={prevPassword}
                        onChange={(e) => {
                            setPrevPassword(e.target.value)
                        }}
                        onFocus={() => setFocusedIndex(1)}
                        // ref={register('name').ref}
                    />
                    <div className="space-y-1">
                        <Input
                            title="비밀번호"
                            required={true}
                            index={2}
                            focusedIndex={focusedIndex}
                            id="password"
                            name="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={password}
                            placeholder="비밀번호를 입력해주세요"
                            onChange={(e) => {
                                onChange(e, 'password')
                            }}
                            onFocus={() => {
                                onfocus(2, 'password')
                            }}
                            ref={register('password').ref}
                        >
                            <div
                                onClick={() => {
                                    setIsPasswordVisible(!isPasswordVisible)
                                }}
                                className="flex flex-row items-center px-3"
                            >
                                {isPasswordVisible ? <VisibilityOn /> : <VisibilityOff />}
                            </div>
                        </Input>
                        {errors.password?.message && (
                            <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                                *{errors.password?.message}
                            </p>
                        )}
                        <div className="space-y-1">
                            <Input
                                title="비밀번호 확인"
                                required={true}
                                index={3}
                                focusedIndex={focusedIndex}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                value={confirmPassword}
                                placeholder="비밀번호를 다시 입력해주세요"
                                onChange={(e) => {
                                    onChange(e, 'confirmPassword')
                                }}
                                onFocus={() => {
                                    onfocus(3, 'confirmPassword')
                                }}
                                ref={register('confirmPassword').ref}
                            >
                                <div
                                    onClick={() => {
                                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                                    }}
                                    className="flex flex-row items-center px-3"
                                >
                                    {isConfirmPasswordVisible ? <VisibilityOn /> : <VisibilityOff />}
                                </div>
                            </Input>
                            {errors.confirmPassword?.message && (
                                <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                                    *{errors.confirmPassword?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
                <section className="w-full h-[20%]">
                    <form onSubmit={GetPasswordOnEmail} className="w-full">
                        <button
                            disabled={!isFormValid}
                            type="submit"
                            className={`${!isFormValid ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
                        >
                            <p className="font-Pretendard text-white text-[15px] font-bold">비밀번호 변경하기</p>
                        </button>
                    </form>
                </section>
            </main>
            {isAlertOpen && (
                <Alert type={getIdIsSuccess ? 'success' : 'error'} isAlertOpen={isAlertOpen}>
                    {getIdIsSuccess ? (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {getIdMessage} <br /> 다시 로그인 해주세요
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        setIsAlertOpen(false)
                                        signOut()
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
                                {getIdMessage} <br /> 다시 확인해주세요
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full"></div>
                            <button
                                onClick={() => {
                                    setPrevPassword('')
                                    setPassword('')
                                    setConfirmPassword('')
                                    setIsAlertOpen(false)
                                }}
                                className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                            >
                                닫기
                            </button>
                        </>
                    )}
                </Alert>
            )}
        </>
    )
}
