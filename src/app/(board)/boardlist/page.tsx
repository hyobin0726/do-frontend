import { redirect } from 'next/navigation'
import { CrewType } from '@/type/CrewType'
import { getCrewList } from '@/api/crew/CrewList'

const RedirectToCrewBoard = async () => {
    const crew: CrewType[] = await getCrewList()

    if (!crew) {
        return <div className=" text-gray-500  text-center mt-5">소모임이 없습니다.</div>
    }

    const defaultCrewId = crew[0]?.crewId
    redirect(`/boardlist/${defaultCrewId}?page=0`)

    return null // 리다이렉트 중이므로 이 컴포넌트는 실제로 렌더링되지 않음
}

export default RedirectToCrewBoard
