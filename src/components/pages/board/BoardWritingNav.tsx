'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import BoardPost from './BoardPost'

export default function BoardWritingNav({ handleUpload }: { handleUpload: () => void }) {
    return (
        <>
            <div className="drop-shadow-sm bg-white py-4 w-full z-[1000] h-[60px]">
                <div className="relative px-4 flex items-center justify-between ">
                    <RouterBackArrowButton />
                    <p className="font-semibold">게시글 작성</p>
                    <button>
                        <BoardPost />
                    </button>
                </div>
            </div>
        </>
    )
}
