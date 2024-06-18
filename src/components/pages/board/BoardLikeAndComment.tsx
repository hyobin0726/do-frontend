import BoardLike from '@/components/images/BoarLike'
import BoardComment from '@/components/images/BoardCommet'

export default function BoardLikeAndComment() {
    return (
        <section className="border-t-[1px]">
            <div className="flex space-x-4 mt-2">
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardLike />
                    </div>
                    <p className="flex ">좋아요 1000개</p>
                </button>
                <button className="flex justify-center items-center">
                    <div className=" w-7 h-7 mr-1">
                        <BoardComment />
                    </div>
                    <p>댓글 1000개</p>
                </button>
            </div>
        </section>
    )
}
