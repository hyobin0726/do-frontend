import { GetBoardComment } from '@/api/board/boardcomment'
import { ReadBoard } from '@/api/board/readBoard'
import BoardComment from '@/components/pages/board/BoardComment'
import BoardImage from '@/components/pages/board/BoardImage'
import BoardLikeAndComment from '@/components/pages/board/BoardLikeAndComment'
import BoardProfile from '@/components/pages/board/BoardProfile'
import { BoardType } from '@/type/BoardType'

export default async function Board({ params }: { params: { boardId: string } }) {
    const boardId: string = params.boardId
    // console.log('boardId', boardId)
    const board: BoardType = await ReadBoard(boardId)
    const comment = await GetBoardComment(boardId, 0)
    // console.log(comment, 'comment')
    return (
        <main className="space-y-3 p-3 h-[calc(100dvh-130px)] overflow-y-scroll ">
            <div className="flex items-center mb-4">
                <BoardProfile
                    createdAt={board.createdAt}
                    writerName={board.writerName}
                    writerProfileImageUrl={board.writerProfileImageUrl}
                    updatedAt={board?.updatedAt}
                />
            </div>
            <div>
                <p>{board.content}</p>
            </div>
            <BoardImage imageUrls={board.imageUrls} />
            <BoardLikeAndComment boardId={boardId} likeCount={board.likeCount} commentCount={board.commentCount} />
            <BoardComment boardId={boardId} data={comment.commentList} lastPage={comment.isLast} />
        </main>
    )
}
