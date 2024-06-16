import BoardLike from '@/components/images/BoarLike'
import BoardComment from '@/components/images/BoardCommet'

export default function BoardLikeAndComment() {
    return (
        <div className="border-t-[1px]  ">
            <div className="flex space-x-4 mt-2">
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardLike />
                    </div>
                    <div className="flex ">좋아요 1000개</div>
                </button>
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardComment />
                    </div>
                    <div>댓글 1000개</div>
                </button>
            </div>
        </div>
    )
}
