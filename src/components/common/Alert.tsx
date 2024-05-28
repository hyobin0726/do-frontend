'use client'

import React, { useState, useEffect } from 'react'

import QuestionMark from '../images/QuestionMark'
import SuccessMark from '../images/SuccessMark'
import WarninMark from '../images/WarninMark'
import ErrorMark from '../images/ErrorMark'
import InfoMark from '../images/InfoMark'

interface AlertProps {
    type: 'question' | 'info' | 'error' | 'success' | 'warning'
    isAlertOpen: boolean
    children: React.ReactNode
}

export default function Alert({ type, isAlertOpen, children }: AlertProps) {
    const [visible, setVisible] = useState(isAlertOpen)
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {
        if (isAlertOpen) {
            setVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            setIsFading(true)
            document.body.style.overflow = 'unset'
            const timer = setTimeout(() => {
                setIsFading(false)
                setVisible(false)
            }, 200) // fadeOut 애니메이션 시간과 맞춤
            return () => clearTimeout(timer)
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isAlertOpen])

    return (
        <>
            {visible && (
                <>
                    <div
                        className={`
                            fixed top-0 left-0 z-[300]
                            w-dvw h-svh 
                            bg-[#000000] bg-opacity-30 
                            transition-all
                            ${isAlertOpen ? '' : 'fade-out-background'}`}
                    ></div>
                    <div
                        className={`z-[350] bg-transparent flex justify-center items-center fixed top-0 left-0 w-dvw h-[80svh] ${
                            isFading ? 'fade-out-alert' : ''
                        }`}
                        style={{
                            animation: isAlertOpen ? 'slideInDown 0.4s ease-in-out' : '',
                        }}
                    >
                        <div className="bg-white w-2/3 rounded-xl p-3 flex flex-col items-center">
                            <div className="w-1/5 h-auto border-2 border-hobbing-red rounded-full my-3 p-1">
                                {type === 'question' && <QuestionMark />}
                                {type === 'info' && <InfoMark />}
                                {type === 'error' && <ErrorMark />}
                                {type === 'success' && <SuccessMark />}
                                {type === 'warning' && <WarninMark />}
                            </div>
                            <div className=" flex flex-col justify-center items-center border-t-[1px] py-3 border-hobbing-gray space-y-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
