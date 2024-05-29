'use client'

import { useState } from 'react'
import BasicModal from './BaisicModal'
import KaKaoLogo from '../images/KaKaoLogo'
import Share from '../images/Share'

interface ShareKakaoProps {
    thumbnail?: string
    crewName?: string
    crewIntroduction?: string
    path?: string
}

export default function ShareKakao({ thumbnail, crewName, crewIntroduction, path }: ShareKakaoProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)

    const onShareModalChange = () => {
        setIsShareModalOpen(!isShareModalOpen)
    }

    const handlerKakaoShare = () => {
        const { Kakao } = window
        Kakao.Share.sendCustom({
            templateId: 108376,
            templateArgs: {
                THU: thumbnail,
                crewName: crewName,
                crewIntroduction: crewIntroduction,
                path: path,
            },
        })
        setIsShareModalOpen(!isShareModalOpen)
    }
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            alert('클립보드에 복사되었습니다.')
        } catch (error) {
            alert('복사 기능이 지원되지 않는 브라우저입니다.')
            console.error(error)
        }
    }
    const handleCopyClick = () => {
        const textToCopy = `http://localhost:3000/${path}`
        copyToClipboard(textToCopy)
        setIsShareModalOpen(!isShareModalOpen)
    }
    return (
        <>
            <div className="text-xs" onClick={onShareModalChange}>
                공유하기
            </div>
            <BasicModal isBasicModalOpen={isShareModalOpen}>
                <div className="font-bold mb-2">공유하기</div>
                <div className="flex space-x-4 items-center">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <KaKaoLogo onClick={handlerKakaoShare} />
                        </div>
                        <div className="mt-2 text-sm">카카오톡</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex border rounded-full w-[50px] h-[50px] items-center justify-center bg-white ">
                            <Share onClick={handleCopyClick} />
                        </div>
                        <div className="mt-2 text-sm ">링크복사</div>
                    </div>
                </div>
                <button onClick={onShareModalChange}>닫기</button>
            </BasicModal>
        </>
    )
}
