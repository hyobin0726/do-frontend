'use client'
import Link from 'next/link'
import { CrewType } from '@/type/CrewType'
import BoardCrew from './BoardCrew'
import { useState } from 'react'
import Alert from '@/components/common/Alert'

export default function BoardNav({ crew }: { crew: CrewType[] }) {
    const [isClicked, setIsClicked] = useState<string | null>(crew[0]?.crewId || null)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const handleClick = (crewId: string) => {
        setIsClicked((prev) => (prev === crewId ? null : crewId))
        if (isAlertOpen) {
            setIsAlertOpen(false)
        }
    }

    const handleWriteClick = () => {
        if (!isClicked) {
            setIsAlertOpen(true)
        }
    }

    return (
        <>
            <div className="w-full bg-white shadow-md py-4">
                <div className="flex overflow-x-scroll space-x-4 px-4">
                    {crew.map((profile, index) => (
                        <BoardCrew
                            key={index}
                            profile={profile}
                            isClicked={profile.crewId === isClicked}
                            onClick={() => handleClick(profile.crewId)}
                        />
                    ))}
                </div>
                <div className="absolute bottom-20 right-3">
                    {isClicked ? (
                        <Link href={`/boardwriting/${isClicked}`}>
                            <div className="bg-hobbing-bg-pink rounded-full h-12 w-24 flex items-center justify-center shadow-md text-gray-500">
                                글쓰기
                            </div>
                        </Link>
                    ) : (
                        <div
                            onClick={handleWriteClick}
                            className="bg-hobbing-bg-pink rounded-full h-12 w-24 flex items-center justify-center shadow-md text-gray-500 cursor-pointer"
                        >
                            글쓰기
                        </div>
                    )}
                </div>
            </div>
            {isAlertOpen && (
                <Alert type="info" isAlertOpen={isAlertOpen}>
                    <p className="font-Pretendard text-balance text-center text-[15px] leading-loose">
                        소모임을 선택해주세요.
                    </p>
                    <button
                        onClick={() => setIsAlertOpen(false)}
                        className="w-[100px] h-[50px] bg-hobbing-red rounded-xl font-Pretendard text-[13px] text-white font-medium px-3"
                    >
                        닫기
                    </button>
                </Alert>
            )}
        </>
    )
}
