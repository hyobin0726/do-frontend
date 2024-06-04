'use client'

import z from 'zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FindIdSchema } from '@/schemas/FindAccountSchema'

import Input from '@/components/common/Input'
import EmailAuth from '@/components/pages/signup/EmailAuth'
import Alert from '@/components/common/Alert'

type FindIdType = z.infer<typeof FindIdSchema>

export default function FindId() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [emailAvailable, setEmailAvailable] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [focusedIndex, setFocusedIndex] = useState<number>(0)

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FindIdType>({
        resolver: zodResolver(FindIdSchema),
        defaultValues: {
            name,
            email,
        },
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof FindIdType) => {
        const { value } = e.target
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'email':
                setEmail(value)
                break
        }
        register(name).onChange(e)
        trigger(name)
    }

    const onfocus = (index: number, name: keyof FindIdType) => {
        setFocusedIndex(index)
        trigger(name)
    }

    const onSubmit = () => {
        setIsAlertOpen(true)
    }

    const emailAvailableHandler = (emailAvailable: boolean) => {
        setEmailAvailable(emailAvailable)
    }

    const isFormValid = !Object.values(errors).some(Boolean) && name && email && emailAvailable

    return (
        <>
            <div className="px-10 w-full bg-white" style={{ height: 'calc(100svh - 60px)' }}>
                <div className="w-full h-[20%] flex flex-col justify-end pb-5">
                    <p className="text-[15px] sm:text-[13px] md:text-[17px] text-black ">
                        본인인증 후 이메일로 아이디를 보내드립니다.
                    </p>
                </div>
                <div className="w-full h-[50%] space-y-3">
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
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full h-auto">
                    <button
                        disabled={!isFormValid}
                        type="submit"
                        className={`${!isFormValid ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
                    >
                        <p className="font-Pretendard text-white text-[15px] font-bold">아이디 찾기</p>
                    </button>
                </form>
            </div>
            {isAlertOpen && (
                <Alert type="success" isAlertOpen={isAlertOpen}>
                    <p className="font-Pretendard text-balance text-center text-[15px]">test</p>
                    <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                        <button
                            onClick={() => setIsAlertOpen(false)}
                            className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                        >
                            확인
                        </button>
                    </div>
                </Alert>
            )}
        </>
    )
}
