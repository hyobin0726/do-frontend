import CrewMemberList from '@/components/pages/crew/CrewMemberList'
import { CrewMemberType } from '@/type/CrewType'
import { GetCrewMember } from '@/api/crew/getCrewMember'

export default async function MemberList({ params }: { params: { crewId: string } }) {
    const crewId = params.crewId
    const membersData: CrewMemberType[] = await GetCrewMember({ crewId })

    return (
        <main>
            <div className=" bg-white p-5 space-y-5">
                <h1 className="text-xl font-medium border-b-[1px] border-hobbing-pink pb-2 text-center">회원 정보</h1>
            </div>
            <CrewMemberList crewId={crewId} membersDataList={membersData} />
        </main>
    )
}
