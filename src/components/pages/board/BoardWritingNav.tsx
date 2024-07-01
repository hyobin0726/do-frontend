import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import BoardPost from './BoardPost'

export default function BoardWritingNav() {
    return (
        <>
            <div className="drop-shadow-sm bg-white py-4 w-full z-[1000] h-[60px] sticky top-0 ">
                <div className="mx-auto px-2 flex items-center">
                    <div className=" absolute left-2">
                        <RouterBackArrowButton />
                    </div>
                    <p className="font-semibold text-center w-full">게시글 작성</p>
                    <button type="submit" className=" absolute right-2">
                        <BoardPost />
                    </button>
                </div>
            </div>
        </>
    )
}
