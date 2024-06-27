import { getCrewBoardList } from '@/api/board/BoardList'
import { GetBoardPin } from '@/api/board/getBoardPin'
import { getCrewList } from '@/api/crew/CrewList'
import Board from '@/components/pages/board/Board'
import BoardList from '@/components/pages/board/BoardList'
import BoardNav from '@/components/pages/board/BoardNav'
import { CrewType } from '@/type/CrewType'

export default async function BoardPage({ params }: { params: { crewId: string } }) {
    const crew: CrewType[] = await getCrewList()
    const { crewId } = params
    const data = await getCrewBoardList(crewId, 0)
    const pindata = await GetBoardPin(crewId)

    return (
        <main className="w-full h-[calc(100dvh-140px)] relative overflow-y-scroll scrollbar-hide bg-hobbing-bg-gray">
            <BoardNav crew={crew} selectedCrewId={crewId} />
            {pindata && (
                <div className="p-5 space-y-2">
                    <Board boardId={pindata.boardId} />
                </div>
            )}
            <BoardList data={data.boardList} crewId={crewId} lastPage={data.isLast} />
            {data.boardList.length === 0 && (
                <section className=" text-gray-500  text-center mt-5">게시글이 없습니다.</section>
            )}
        </main>
    )
}
