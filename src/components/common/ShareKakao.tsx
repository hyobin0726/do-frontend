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
        const textToCopy = `https://hobbie-do.site/${path}`
        copyToClipboard(textToCopy)
        setIsShareModalOpen(!isShareModalOpen)
    }
    return (
        <section>
            <p className="text-xs" onClick={onShareModalChange}>
                공유하기
            </p>
            <BasicModal isBasicModalOpen={isShareModalOpen}>
                <div className=" flex items-center flex-col space-y-3">
                    <p className="font-bold mb-2">공유하기</p>
                    <div className="flex space-x-4 items-center">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <KaKaoLogo onClick={handlerKakaoShare} />
                            </div>
                            <p className="mt-2 text-sm">카카오톡</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex border rounded-full w-[50px] h-[50px] items-center justify-center bg-white ">
                                <Share onClick={handleCopyClick} />
                            </div>
                            <p className="mt-2 text-sm ">링크복사</p>
                        </div>
                    </div>
                    <button
                        onClick={onShareModalChange}
                        className="w-[50%] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
                    >
                        <p className="text-white text-[13px] font-bold"> 닫기</p>
                    </button>
                </div>
            </BasicModal>
        </section>
    )
}
