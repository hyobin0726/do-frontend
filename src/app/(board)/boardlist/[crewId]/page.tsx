import { getCrewBoardList } from '@/api/board/BoardList'
import { getCrewList } from '@/api/crew/CrewList'
import BoardList from '@/components/pages/board/BoardList'
import BoardNav from '@/components/pages/board/BoardNav'
import { CrewType } from '@/type/CrewType'

export default async function BoardPage({ params }: { params: { crewId: string } }) {
    const crew: CrewType[] = await getCrewList()
    const { crewId } = params
    const data = await getCrewBoardList(crewId, 0)

    return (
        <main>
            <BoardNav crew={crew} selectedCrewId={crewId} />
            <BoardList data={data.boardList} crewId={crewId} lastPage={data.isLast} />
            {data.boardList.length === 0 && (
                <section className=" text-gray-500  text-center mt-5">게시글이 없습니다.</section>
            )}
        </main>
    )
}
