'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import { useParams } from 'next/navigation'
import BoardPost from './BoardPost'

export default function BoardWritingNav({ handleUpload }: { handleUpload: () => void }) {
    const params = useParams<{ crewId: string }>()

    return (
        <>
            <div className="drop-shadow-sm bg-white py-4 w-full z-[1000] h-[60px]">
                <div className="relative px-4 flex items-center justify-between ">
                    <RouterBackArrowButton />
                    <p className="font-semibold">{params.crewId}</p>
                    <button onClick={handleUpload}>
                        <BoardPost />
                    </button>
                </div>
            </div>
        </>
    )
}
