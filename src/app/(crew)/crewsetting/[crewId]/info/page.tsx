import getCrewInfo from '@/api/crew/getCrewInfo'
import CrewUpdate from '@/components/pages/crew/CrewUpdate'
import { CrewInfoType } from '@/type/CrewType'

export default async function Info({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    const crew: CrewInfoType = await getCrewInfo({ crewId })
    return (
        <main className="w-full h-[calc(100dvh-60px)] pb-5 relative overflow-y-scroll scrollbar-hide">
            <CrewUpdate data={crew} crewId={crewId} />
        </main>
    )
}
