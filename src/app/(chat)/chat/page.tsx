import { getCrewList } from '@/api/crew/CrewList'
import ChatList from '@/components/pages/chat/ChatList'
import { CrewType } from '@/type/CrewType'

export default async function ChatPage() {
    const crewList: CrewType[] = await getCrewList()

    return (
        <div className=" bg-[#FBFBFD] h-[calc(100dvh-140px)] overflow-y-scroll scrollbar-hide">
            {crewList ? (
                <ChatList crewList={crewList} />
            ) : (
                <div className=" text-gray-500  text-center mt-5">소모임이 없습니다.</div>
            )}
        </div>
    )
}
