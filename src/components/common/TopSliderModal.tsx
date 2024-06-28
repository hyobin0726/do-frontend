'use client'
import React, { useEffect } from 'react'

interface SliderModalProps {
    children: React.ReactNode
    isModalOpen: boolean
    onChangeModal: () => void
    backgroundClose: boolean
    top?: boolean
}

export default function SliderModal({
    children,
    isModalOpen,
    onChangeModal,
    backgroundClose,
    top, // 기존 bottom을 top으로 변경
}: SliderModalProps) {
    // 모달 오픈시 body 스크롤 막기
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    return (
        <>
            <div
                onClick={backgroundClose ? onChangeModal : () => {}}
                className={`
                    fixed top-0 left-0 z-[200]
                    w-screen h-svh
                    bg-gray-800 bg-opacity-50
                    transition-all
                    ${isModalOpen ? '' : 'hidden'}`}
            ></div>
            <div
                style={{
                    transform: isModalOpen ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.7s ease-out',
                }}
                className={`
                    ${top ? `top-[0px]` : 'top-0'} 
                    fixed right-0 left-0 z-[300]
                    rounded-b-2xl w-screen 
                    bg-white
                    pt-3
                    flex flex-col justify-center items-center
                    ${isModalOpen ? 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]' : ''}
                `}
            >
                {children}
                <div className="w-full py-3 flex justify-center">
                    <svg width="40" height="4" viewBox="0 0 40 4" fill="none">
                        <rect width="40" height="4" rx="2" fill="#E5E5E5" />
                    </svg>
                </div>
            </div>
        </>
    )
}
