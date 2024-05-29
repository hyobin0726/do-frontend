'use client'

import React, { useState, useEffect } from 'react'

interface BasicModalProps {
    isBasicModalOpen: boolean
    children: React.ReactNode
}

export default function BasicModal({ isBasicModalOpen, children }: BasicModalProps) {
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {
        if (isBasicModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            setIsFading(true)
            document.body.style.overflow = 'unset'
            const timer = setTimeout(() => {
                setIsFading(false)
            }, 200) // fadeOut 애니메이션 시간과 맞춤
            return () => clearTimeout(timer)
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isBasicModalOpen])

    return (
        <>
            {isBasicModalOpen && (
                <>
                    <div
                        className={`
                            fixed top-0 left-0 z-[300]
                            w-dvw h-svh 
                            bg-[#000000] bg-opacity-30 
                            transition-all
                            ${isBasicModalOpen ? '' : 'fade-out-background'}`}
                    ></div>
                    <div
                        className={`z-[350] bg-transparent flex justify-center items-center fixed top-0 left-0 w-dvw h-[80svh] ${
                            isFading ? 'fade-out-alert' : ''
                        }`}
                        style={{
                            animation: isBasicModalOpen ? 'slideInDown 0.4s ease-in-out' : '',
                        }}
                    >
                        <div className="bg-white w-2/5 rounded-xl p-3 flex flex-col items-center">{children}</div>
                    </div>
                </>
            )}
        </>
    )
}
