import React, { useState, useRef, RefObject, forwardRef, useImperativeHandle } from 'react'

import Input from '@/components/common/Input'
import Timer from '@/components/common/Timer'

interface EmailAuthProps {
    focusedIndex: number
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
    onfocus: (index: number, name: string) => void
    onfocusIndex: () => void
    inputRef?: RefObject<HTMLInputElement> | ((instance: HTMLInputElement | null) => void) | null
    children?: React.ReactNode
    emailAuthButtonActive: boolean
}

const EmailAuth = forwardRef<HTMLInputElement, EmailAuthProps>(
    (
        { focusedIndex, value: email, onChange, onfocus, onfocusIndex, inputRef, children, emailAuthButtonActive },
        ref,
    ) => {
        const emailAuthInputRef = useRef<HTMLInputElement>(null)
        const clockRef = useRef<{ reset: () => void }>(null)

        useImperativeHandle(ref, () => emailAuthInputRef.current!)

        const [showEmailAuthInputContainer, setShowEmailAuthInputContainer] = useState<boolean>(false)
        const [emailAuthNumber, setEmailAuthNumber] = useState<string>('')

        const handleEmailAuthButtonClick = () => {
            setShowEmailAuthInputContainer(true)
            onfocusIndex()
            setTimeout(() => {
                emailAuthInputRef.current?.focus()
            }, 0)
            if (clockRef.current) {
                clockRef.current.reset()
            }
        }

        return (
            <div className={`${children ? 'space-y-1' : 'space-y-3'}`}>
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
                            onChange(e, 'email')
                        }}
                        onFocus={() => {
                            onfocus(2, 'email')
                        }}
                        ref={inputRef}
                    />
                    <button
                        disabled={emailAuthButtonActive}
                        className={`w-[100px] h-[50px] ${emailAuthButtonActive ? 'bg-hobbing-bg-pink' : 'bg-hobbing-red'} rounded-xl font-Pretendard text-[13px] text-white font-medium px-3`}
                        onClick={handleEmailAuthButtonClick}
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
                            <Timer ref={clockRef} min={3} />
                        </Input>
                        <button className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3">
                            확인
                        </button>
                    </div>
                )}
            </div>
        )
    },
)

EmailAuth.displayName = 'EmailAuth'

export default EmailAuth
