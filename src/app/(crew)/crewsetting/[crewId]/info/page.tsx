import getCrewInfo from '@/api/crew/getCrewInfo'
import CrewInfo from '@/components/pages/crew/CrewInfo'
import { CrewInfoType } from '@/type/CrewType'

export default async function Info({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    const crew: CrewInfoType = await getCrewInfo({ crewId })
    return (
        <div>
            <CrewInfo data={crew} crewId={crewId} />
        </div>
    )
}
