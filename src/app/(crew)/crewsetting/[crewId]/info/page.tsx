import getCrewInfo from '@/api/crew/getCrewInfo'
import CrewUpdate from '@/components/pages/crew/CrewUpdate'
import { CrewInfoType } from '@/type/CrewType'

export default async function Info({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    const crew: CrewInfoType = await getCrewInfo({ crewId })
    return (
        <div>
            <CrewUpdate data={crew} crewId={crewId} />
        </div>
    )
}
