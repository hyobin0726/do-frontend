'use client'

import z from 'zod'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FindPasswordSchema } from '@/schemas/FindAccountSchema'

import Input from '@/components/common/Input'
import Alert from '@/components/common/Alert'

type FindPasswordType = z.infer<typeof FindPasswordSchema>

export default function FindPassword() {
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [focusedIndex, setFocusedIndex] = useState<number>(0)
    const [getIdIsSuccess, setGetIdIsSuccess] = useState<boolean>(false)
    const [getIdMessage, setGetIdMessage] = useState<string>('')

    const router = useRouter()

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm<FindPasswordType>({
        resolver: zodResolver(FindPasswordSchema),
        defaultValues: {
            name,
            email,
            id,
        },
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof FindPasswordType) => {
        const { value } = e.target
        switch (name) {
            case 'id':
                setId(value)
                break
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

    const onfocus = (index: number, name: keyof FindPasswordType) => {
        setFocusedIndex(index)
        trigger(name)
    }

    const GetPasswordOnEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/user-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                loginId: id,
            }),
        })
        const data = await res.json()
        setGetIdIsSuccess(data.isSuccess)
        setGetIdMessage(data.message)
        setIsAlertOpen(true)
    }

    const isFormValid = !Object.values(errors).some(Boolean) && name && email && id

    return (
        <>
            <form
                className="px-10 w-full bg-white"
                style={{ height: 'calc(100dvh - 60px)' }}
                onSubmit={GetPasswordOnEmail}
            >
                <div className="w-full h-[20%] flex flex-col justify-end pb-10">
                    <p className="text-[15px] sm:text-[13px] md:text-[17px] text-black font-medium">
                        본인인증 후 이메일로
                        <br />
                        임시 비밀번호를 보내드립니다.
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
                    <div className="space-y-1">
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
                                onChange(e, 'email')
                            }}
                            onFocus={() => {
                                onfocus(2, 'email')
                            }}
                            ref={register('email').ref}
                        />
                        {errors.email && (
                            <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                                *{errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Input
                            title="아이디"
                            required={true}
                            index={3}
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
                                onfocus(3, 'id')
                            }}
                            ref={register('id').ref}
                        />
                        {errors.id && (
                            <p className="text-hobbing-red text-[11px] font-medium font-Pretendard">
                                *{errors.id.message}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    disabled={!isFormValid}
                    type="submit"
                    className={`${!isFormValid ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
                >
                    <p className="font-Pretendard text-white text-[15px] font-bold">임시 비밀번호 발급받기</p>
                </button>
            </form>
            {isAlertOpen && (
                <Alert type={getIdIsSuccess == true ? 'success' : 'error'} isAlertOpen={isAlertOpen}>
                    {getIdIsSuccess == true ? (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {getIdMessage}
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        setIsAlertOpen(false)
                                        router.push('/login')
                                    }}
                                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                >
                                    로그인
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                                {getIdMessage}
                                <br />
                                다시 시도해주세요.
                            </p>
                            <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                                <button
                                    onClick={() => {
                                        setName('')
                                        setEmail('')
                                        setId('')
                                        setIsAlertOpen(false)
                                    }}
                                    className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                                >
                                    닫기
                                </button>
                            </div>
                        </>
                    )}
                </Alert>
            )}
        </>
    )
}
