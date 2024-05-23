'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/common/Input'
import RightArrow from '@/components/images/RightArrow'
import { useSignUpStore } from '@/hooks/useSignUpStore'
import ProgressBar from '@/components/common/ProgressBar'
import { signUpStep2Schema } from '@/schemas/signUpSchema '

type SignUpType = z.infer<typeof signUpStep2Schema>

export default function SignUpFormStep2() {
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const { name, id, password, confirmPassword, setName, setId, setPassword, setConfirmPassword } = useSignUpStore()

    const router = useRouter()

    const {
        register,
        handleSubmit,
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

    const onSubmit = (data: SignUpType) => {
        console.log('Form Data:', data)
        router.push('/signup?step=3')
    }

    return (
        <>
            <div className="w-full h-3/6 px-10 space-y-3">
                <div className="space-y-1">
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
                            setName(e.target.value)
                            register('name').onChange(e)
                        }}
                        onFocus={() => {
                            setFocusedIndex(1)
                        }}
                        ref={register('name').ref}
                    />
                    {errors.name && <p className="text-hobbing-red text-[11px]">*{errors.name.message}</p>}
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
                                setId(e.target.value)
                                register('id').onChange(e)
                            }}
                            onFocus={() => {
                                setFocusedIndex(2)
                            }}
                            ref={register('id').ref}
                        />
                        <button className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3">
                            중복확인
                        </button>
                    </div>
                    {errors.id && <p className="text-hobbing-red text-[11px]">*{errors.id.message}</p>}
                </div>
                <div className="space-y-1">
                    <Input
                        title="비밀번호"
                        required={true}
                        index={3}
                        focusedIndex={focusedIndex}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            register('password').onChange(e)
                        }}
                        placeholder="비밀번호를 입력해주세요"
                        onFocus={() => {
                            setFocusedIndex(3)
                        }}
                        ref={register('password').ref}
                    />
                    {errors.password?.message && (
                        <p className="text-hobbing-red text-[11px]">*{errors.password?.message}</p>
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
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            register('confirmPassword').onChange(e)
                        }}
                        placeholder="비밀번호를 다시 입력해주세요"
                        onFocus={() => {
                            setFocusedIndex(4)
                        }}
                        ref={register('confirmPassword').ref}
                    />
                    {errors.confirmPassword?.message && (
                        <p className="text-hobbing-red text-[11px]">*{errors.confirmPassword?.message}</p>
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
