import { GetCrewJoinForm } from '@/api/crew/getCrewJoinForm'
import CrewJoinForm from '@/components/pages/crew/CrewJoinForm'

export default async function CrewJoin({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    const data = await GetCrewJoinForm({ crewId })
    console.log('!!!', data)
    return (
        <main className=" bg-white p-5 space-y-5">
            <h1 className="text-xl font-medium border-b-[1px] border-hobbing-pink pb-2 text-center">가입 신청 내역</h1>
            <CrewJoinForm data={data} />
        </main>
    )
}
