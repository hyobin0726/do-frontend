'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/common/Input'
import RightArrow from '@/components/images/RightArrow'
import { useSignUpStore } from '@/hooks/useSignUpStore'
import ProgressBar from '@/components/common/ProgressBar'
import { signUpStep3Schema } from '@/schemas/signUpSchema '

type SignUpType = z.infer<typeof signUpStep3Schema>

export default function SignUpFormStep3() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [showEmailAuthInputContainer, setShowEmailAuthInputContainer] = useState<boolean>(false)
    const [emailAuthNumber, setEmailAuthNumber] = useState<string>('')
    const emailAuthInputRef = useRef<HTMLInputElement>(null)

    const { phoneNumber, setPhoneNumber, email, setEmail, gender, setGender, birthDate, setBirthDate } =
        useSignUpStore()

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpType>({
        resolver: zodResolver(signUpStep3Schema),
        defaultValues: {
            phoneNumber,
            email,
            gender,
            birthDate,
        },
    })

    const onSubmit = (data: SignUpType) => {
        console.log('Form Data:', data)
        router.push('/signup?step=4')
    }

    const handleEmailAuthButtonClick = () => {
        setShowEmailAuthInputContainer(true)
        setFocusedIndex(3)
        setTimeout(() => {
            emailAuthInputRef.current?.focus()
        }, 0)
    }

    return (
        <>
            <div className="w-full h-3/6 px-10 space-y-3">
                <div className="space-y-1">
                    <Input
                        title="전화번호"
                        required={true}
                        index={1}
                        focusedIndex={focusedIndex}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="전화번호를 입력해주세요"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                            register('phoneNumber').onChange(e)
                        }}
                        onFocus={() => {
                            setFocusedIndex(1)
                        }}
                        ref={register('phoneNumber').ref}
                    />
                    {errors.phoneNumber && (
                        <p className="text-hobbing-red text-[11px]">*{errors.phoneNumber.message}</p>
                    )}
                </div>
                <div className={`${errors.email ? 'space-y-1' : 'space-y-3'}`}>
                    <div className="flex flex-row space-x-2">
                        <Input
                            title="이메일"
                            required={true}
                            index={2}
                            focusedIndex={focusedIndex}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                register('email').onChange(e)
                            }}
                            onFocus={() => {
                                setFocusedIndex(2)
                            }}
                            ref={register('email').ref}
                        />
                        <button
                            className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                            onClick={handleEmailAuthButtonClick}
                        >
                            인증
                        </button>
                    </div>
                    {errors.email && <p className="text-hobbing-red text-[11px]">*{errors.email.message}</p>}
                    {showEmailAuthInputContainer && (
                        <div className="flex flex-row space-x-2">
                            <Input
                                index={3}
                                focusedIndex={focusedIndex}
                                id="emailAuth"
                                type="text"
                                placeholder="인증번호 입력"
                                value={emailAuthNumber}
                                onChange={(e) => setEmailAuthNumber(e.target.value)}
                                onFocus={() => {
                                    setFocusedIndex(3)
                                }}
                                ref={emailAuthInputRef}
                            />

                            <button
                                className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                // onClick={handleEmailAuthButtonClick}
                            >
                                인증번호체크
                            </button>
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <Input
                        title="성별"
                        required={true}
                        index={4}
                        focusedIndex={focusedIndex}
                        id="gender"
                        name="gender"
                        type="text"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value)
                            register('gender').onChange(e)
                        }}
                        placeholder="성별을 입력해주세요"
                        onFocus={() => {
                            setFocusedIndex(4)
                        }}
                        ref={register('gender').ref}
                    />
                    {errors.gender?.message && (
                        <p className="text-hobbing-red text-[11px]">*{errors.gender?.message}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input
                        title="생년월일"
                        required={true}
                        index={5}
                        focusedIndex={focusedIndex}
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={birthDate}
                        placeholder="생년월일을 입력해주세요"
                        onChange={(e) => {
                            setBirthDate(e.target.value)
                            register('birthDate').onChange(e)
                        }}
                        onFocus={() => {
                            setFocusedIndex(5)
                        }}
                        ref={register('birthDate').ref}
                    />
                    {errors.birthDate?.message && (
                        <p className="text-hobbing-red text-[11px]">*{errors.birthDate?.message}</p>
                    )}
                </div>
            </div>
            <div className="w-full h-2/6 px-10 flex flex-col justify-around items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full h-auto">
                    <button
                        type="submit"
                        className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                    >
                        <p className="font-Pretendard text-white text-[15px] font-bold">NEXT</p>
                        <RightArrow width={15} height={15} />
                    </button>
                </form>
                <div className="w-5/6 h-auto">
                    <ProgressBar step={1} total={5} />
                </div>
            </div>
        </>
    )
}
