'use client'

import React, { useState } from 'react'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/common/Input'
import { useSignUpStore } from '@/hooks/useSignUpStore'
import { signUpStep3Schema } from '@/schemas/signUpSchema'
import SignUpGenderSelecter from './SignUpGenderSelecter'
import EmailAuth from './EmailAuth'
import SignupButton from './SignupButton'

type SignUpType = z.infer<typeof signUpStep3Schema>

export default function SignUpFormStep3() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [emailAvailable, setEmailAvailable] = useState<boolean>(false)

    const {
        name,
        id,
        password,
        phoneNumber,
        email,
        gender,
        birthDate,
        externalId,
        setPhoneNumber,
        setEmail,
        setGender,
        setBirthDate,
    } = useSignUpStore()

    const {
        register,
        setValue,
        trigger,
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof SignUpType) => {
        const { value } = e.target
        switch (name) {
            case 'phoneNumber':
                setPhoneNumber(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'birthDate':
                setBirthDate(value)
                break
        }
        register(name).onChange(e)
        trigger(name)
    }

    const onfocus = (index: number, name: keyof SignUpType) => {
        setFocusedIndex(index)
        trigger(name)
    }

    const handleGenderChange = (gender: string) => {
        setGender(gender)
        setValue('gender', gender, { shouldValidate: true })
        trigger('gender')
    }

    const emailAvailableHandler = (emailAvailable: boolean) => {
        setEmailAvailable(emailAvailable)
    }

    const isFormValid =
        !Object.values(errors).some(Boolean) && phoneNumber && email && gender && birthDate && emailAvailable

    return (
        <>
            <section className="w-full h-[60%] px-10">
                <div className="space-y-1 mb-3">
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
                            onChange(e, 'phoneNumber')
                        }}
                        onFocus={() => {
                            onfocus(1, 'phoneNumber')
                        }}
                        ref={register('phoneNumber').ref}
                    />
                    {errors.phoneNumber && (
                        <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                            *{errors.phoneNumber.message}
                        </p>
                    )}
                </div>
                <EmailAuth
                    focusedIndex={focusedIndex}
                    value={email}
                    onChange={(e) => onChange(e, 'email')}
                    onfocus={() => {
                        onfocus(2, 'email')
                    }}
                    inputRef={register('email').ref}
                    onfocusIndex={() => {
                        setFocusedIndex(3)
                    }}
                    emailAuthButtonActive={errors.email?.message || !email ? true : false}
                    emailAvailableHandler={emailAvailableHandler}
                >
                    {errors.email?.message && (
                        <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                            *{errors.email?.message}
                        </p>
                    )}
                </EmailAuth>
                <div className={` ${errors.gender ? 'space-y-1' : ''} mb-3`}>
                    <SignUpGenderSelecter
                        index={4}
                        focusedIndex={focusedIndex}
                        value={gender}
                        onChange={handleGenderChange}
                        onFocus={() => {
                            setFocusedIndex(4)
                        }}
                    />
                    {errors.gender?.message && (
                        <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                            *{errors.gender?.message}
                        </p>
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
                            onChange(e, 'birthDate')
                        }}
                        onFocus={() => {
                            onfocus(5, 'birthDate')
                        }}
                        ref={register('birthDate').ref}
                    />
                    {errors.birthDate?.message && (
                        <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                            *{errors.birthDate?.message}
                        </p>
                    )}
                </div>
            </section>
            <SignupButton
                isFormValid={isFormValid}
                name={name}
                id={id}
                password={password}
                phoneNumber={phoneNumber}
                email={email}
                gender={gender}
                birthDate={birthDate}
                externalId={externalId}
            />
        </>
    )
}
