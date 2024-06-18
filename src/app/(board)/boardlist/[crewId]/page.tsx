import { getCrewBoardList } from '@/api/board/BoardList'
import { getCrewList } from '@/api/crew/CrewList'
import BoardList from '@/components/pages/board/BoardList'
import BoardNav from '@/components/pages/board/BoardNav'
import { CrewType } from '@/type/CrewType'

export default async function BoardPage({ params }: { params: { crewId: string } }) {
    const crew: CrewType[] = await getCrewList()
    console.log(crew, '크루 이름')
    const { crewId } = params
    const data = await getCrewBoardList(crewId)

    return (
        <main>
            <BoardNav crew={crew} selectedCrewId={crewId} />
            <BoardList data={data.boardList} crewId={crewId} />

            {crew.length === 0 && <div>소모임이 없습니다.</div>}
            {data.boardList.length === 0 && <div className=" text-gray-500  text-center mt-5">게시글이 없습니다.</div>}
        </main>
    )
}
