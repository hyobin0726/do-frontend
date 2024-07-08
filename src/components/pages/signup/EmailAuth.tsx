import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect, RefObject, RefCallback } from 'react'
import Input from '@/components/common/Input'
import Clock from '@/components/images/Clock'
import Alert from '@/components/common/Alert'
import Loading from '@/components/common/Loading'

interface EmailAuthProps {
    focusedIndex: number
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
    onfocus: (index: number, name: string) => void
    onfocusIndex: () => void
    inputRef?: RefObject<HTMLInputElement> | RefCallback<HTMLInputElement> | null
    children?: React.ReactNode
    emailAuthButtonActive: boolean
    emailAvailableHandler?: (emailAvailable: boolean) => void
}

const EmailAuth = forwardRef<HTMLInputElement, EmailAuthProps>(
    (
        {
            focusedIndex,
            value: email,
            onChange,
            onfocus,
            onfocusIndex,
            inputRef,
            children,
            emailAuthButtonActive,
            emailAvailableHandler,
        },
        ref,
    ) => {
        const emailAuthInputRef = useRef<HTMLInputElement>(null)

        useImperativeHandle(ref, () => emailAuthInputRef.current!)

        const [showEmailAuthInputContainer, setShowEmailAuthInputContainer] = useState<boolean>(false)
        const [emailAuthNumber, setEmailAuthNumber] = useState<string>('')
        const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
        const [alertType, setAlertType] = useState<'warning' | 'success' | 'error'>('warning')
        const [alertMessage, setAlertMessage] = useState<string>('')
        const timerRef = useRef<NodeJS.Timeout | null>(null)
        const [seconds, setSeconds] = useState<number>(180)
        const [loading, setLoading] = useState<boolean>(false)

        useEffect(() => {
            if (showEmailAuthInputContainer) {
                startTimer()
            } else {
                clearTimer()
            }

            return () => clearTimer()
        }, [showEmailAuthInputContainer])

        const startTimer = () => {
            clearTimer()
            timerRef.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 0) {
                        clearTimer()
                        setAlertType('warning')
                        setAlertMessage('인증시간이 만료되었습니다.')
                        setIsAlertOpen(true)
                        return 0
                    }
                    return prevSeconds - 1
                })
            }, 1000)
        }

        const clearTimer = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }

        const handleEmailAuthButtonClick = (email: string) => {
            setShowEmailAuthInputContainer(true)
            setEmailAuthNumber('')
            GetEmailAuth(email)
            onfocusIndex()
            setSeconds(180)
            startTimer()
            setTimeout(() => {
                emailAuthInputRef.current?.focus() // 인증번호 입력 input에 포커스 설정
            }, 100)
        }

        const GetEmailAuth = async (email: string) => {
            const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/email/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
        }

        const GetEmailAuthNumberCheck = async (email: string, emailAuthNumber: string) => {
            if (!emailAuthNumber.trim()) {
                setAlertType('error')
                setAlertMessage('인증번호를 입력해주세요.')
                setIsAlertOpen(true)
                return
            }
            setLoading(true)
            const res = await fetch(`${process.env.BASE_URL}/auth-service/v1/non-users/email/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    authCode: emailAuthNumber,
                }),
            })
            const data = await res.json()
            if (data.isSuccess === true) {
                setLoading(false)
                clearTimer()
                emailAvailableHandler?.(true)
                setAlertType('success')
                setAlertMessage('이메일 인증이 완료되었습니다.')
                setIsAlertOpen(true)
            } else {
                setLoading(false)
                emailAvailableHandler?.(false)
                setAlertType('warning')
                setAlertMessage('인증번호가 일치하지 않습니다.')
                setIsAlertOpen(true)
            }
        }

        const handleCloseAlert = () => {
            setIsAlertOpen(false)
        }

        const handleResend = (email: string) => {
            setIsAlertOpen(false)
            handleEmailAuthButtonClick(email)
        }

        const formatTime = (secs: number) => {
            if (isNaN(secs)) return '0:00'
            const minutes = Math.floor(secs / 60)
            const remainingSeconds = secs % 60
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
        }

        return (
            <>
                <div className={`${children ? 'space-y-1' : 'space-y-3'} mb-3`}>
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
                            onChange={(e) => onChange(e, 'email')}
                            onFocus={() => onfocus(2, 'email')}
                            ref={inputRef || emailAuthInputRef} // inputRef가 없으면 emailAuthInputRef를 사용
                        />
                        <button
                            disabled={emailAuthButtonActive}
                            className={`w-[100px] h-[50px] ${emailAuthButtonActive ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} rounded-xl font-Pretendard text-[13px] text-white font-medium px-3`}
                            onClick={() => {
                                handleEmailAuthButtonClick(email)
                            }}
                        >
                            {!showEmailAuthInputContainer ? '인증' : '재전송'}
                        </button>
                    </div>
                    {children}
                    {showEmailAuthInputContainer && (
                        <div className="flex flex-row space-x-2">
                            <Input
                                index={3}
                                focusedIndex={focusedIndex}
                                id="emailAuth"
                                type="tel"
                                placeholder="인증번호 입력"
                                value={emailAuthNumber}
                                onChange={(e) => setEmailAuthNumber(e.target.value)}
                                onFocus={onfocusIndex}
                                ref={emailAuthInputRef}
                            >
                                <div className="flex flex-row items-center space-x-1">
                                    <Clock />
                                    <p className="text-[12px] font-Pretendard text-hobbing-red font-bold  mr-2">
                                        {formatTime(seconds)}
                                    </p>
                                </div>
                            </Input>
                            <button
                                onClick={() => GetEmailAuthNumberCheck(email, emailAuthNumber)}
                                className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                            >
                                확인
                            </button>
                        </div>
                    )}
                </div>
                {isAlertOpen && (
                    <Alert type={alertType} isAlertOpen={isAlertOpen}>
                        <p className="font-Pretendard text-balance text-center text-[15px]">{alertMessage}</p>
                        <div className="bg-white flex flex-row justify-center items-center space-x-3 w-full">
                            {alertType === 'warning' ? (
                                <>
                                    <button
                                        className="w-[40%] h-[40px] border-[1px] border-hobbing-red rounded-xl flex justify-center items-center"
                                        onClick={handleCloseAlert}
                                    >
                                        <p className="font-Pretendard text-hobbing-red text-[15px]"> 닫기</p>
                                    </button>
                                    <button
                                        className="w-[40%] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
                                        onClick={() => {
                                            handleResend(email)
                                        }}
                                    >
                                        <p className="font-Pretendard text-white font-bold text-[15px]"> 재전송</p>
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="w-[40%] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
                                    onClick={handleCloseAlert}
                                >
                                    <p className="font-Pretendard text-white font-bold text-[15px]"> 확인</p>
                                </button>
                            )}
                        </div>
                    </Alert>
                )}
                {loading && <Loading />}
            </>
        )
    },
)

EmailAuth.displayName = 'EmailAuth'

export default EmailAuth
