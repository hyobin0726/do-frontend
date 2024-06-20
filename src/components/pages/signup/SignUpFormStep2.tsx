'use client'

import React, { useState, useEffect, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUpStore } from '@/hooks/useSignUpStore'
import { signUpStep2Schema } from '@/schemas/signUpSchema'

import Input from '@/components/common/Input'
import IdDuplicateCheck from './IdDuplicateCheck'
import RightArrow from '@/components/images/RightArrow'
import VisibilityOn from '@/components/images/VisibilityOn'
import VisibilityOff from '@/components/images/VisibilityOff'

type SignUpType = z.infer<typeof signUpStep2Schema>

export default function SignUpFormStep2() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [isIdAvailable, setIsIdAvailable] = useState<boolean>(false)
    const [isIdDuplicateCheckOpen, setIsIdDuplicateCheckOpen] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

    const {
        name,
        id,
        password,
        confirmPassword,
        setName,
        setId,
        setPassword,
        setConfirmPassword,
        setEmail,
        setExternalId,
    } = useSignUpStore()

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const nameParam = searchParams.get('name')
        const emailParam = searchParams.get('email')
        const externalIdParam = searchParams.get('externalId')
        if (nameParam) {
            setName(nameParam)
        }
        if (emailParam) {
            setEmail(emailParam)
        }
        if (externalIdParam) {
            setExternalId(externalIdParam)
        }
    }, [searchParams, setName, setEmail])

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm<SignUpType>({
        resolver: zodResolver(signUpStep2Schema),
        defaultValues: {
            name,
            id,
            password,
            confirmPassword,
        },
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof SignUpType) => {
        const { value } = e.target
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'id':
                setId(value)
                break
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

    const onAlertChange = () => {
        setIsIdDuplicateCheckOpen(!isIdDuplicateCheckOpen)
    }

    const onIdAvailableCheck = () => {
        setIsIdAvailable(true)
    }

    const onfocus = (index: number, name: keyof SignUpType) => {
        setFocusedIndex(index)
        trigger(name)
    }

    const isFormValid =
        !Object.values(errors).some(Boolean) && name && id && password && confirmPassword && isIdAvailable

    return (
        <>
            <section className="w-full h-[60%] px-10 space-y-3">
                <div className="space-y-1">
                    {name ? (
                        <Input
                            title="이름"
                            required={true}
                            index={1}
                            focusedIndex={focusedIndex}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="이름을 입력해주세요"
                            value={name}
                            readOnly={true}
                        />
                    ) : (
                        <>
                            <Input
                                title="이름"
                                required={true}
                                index={1}
                                focusedIndex={focusedIndex}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="이름을 입력해주세요"
                                value={name}
                                onChange={(e) => {
                                    onChange(e, 'name')
                                }}
                                onFocus={() => {
                                    onfocus(1, 'name')
                                }}
                                ref={register('name').ref}
                            />
                            {errors.name && (
                                <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                                    *{errors.name.message}
                                </p>
                            )}
                        </>
                    )}
                </div>
                <div className="space-y-1">
                    <div className="flex flex-row space-x-2">
                        <Input
                            title="아이디"
                            required={true}
                            index={2}
                            focusedIndex={focusedIndex}
                            id="id"
                            name="id"
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            value={id}
                            onChange={(e) => {
                                onChange(e, 'id')
                            }}
                            onFocus={() => {
                                onfocus(2, 'id')
                            }}
                            ref={register('id').ref}
                        />
                        <button
                            onClick={onAlertChange}
                            disabled={!id || !!errors.id}
                            className={`w-[100px] h-[50px] ${!id || !!errors.id ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} rounded-xl font-Pretendard text-[13px] text-white font-medium px-3`}
                        >
                            중복확인
                        </button>
                    </div>
                    {errors.id && (
                        <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">*{errors.id.message}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input
                        title="비밀번호"
                        required={true}
                        index={3}
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
                            onfocus(3, 'password')
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
                </div>
                <div className="space-y-1">
                    <Input
                        title="비밀번호 확인"
                        required={true}
                        index={4}
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
                            onfocus(4, 'confirmPassword')
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
            </section>
            <section className="w-full h-[25%] px-10 flex flex-col justify-center items-center">
                <button
                    disabled={!isFormValid}
                    onClick={() => {
                        router.push('/signup?step=3')
                    }}
                    className={`${!isFormValid ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
                >
                    <p className="font-Pretendard text-white text-[15px] font-bold">NEXT</p>
                    <RightArrow width={15} height={15} />
                </button>
            </section>
            {!errors.id && (
                <IdDuplicateCheck
                    id={id}
                    isIdDuplicateCheckOpen={isIdDuplicateCheckOpen}
                    onAlertChange={onAlertChange}
                    onIdAvailableCheck={onIdAvailableCheck}
                />
            )}
        </>
    )
}
