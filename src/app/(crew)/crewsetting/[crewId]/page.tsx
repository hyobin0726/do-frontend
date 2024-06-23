import getCrewInfo from '@/api/crew/getCrewInfo'
import CrewInfo from '@/components/pages/crew/CrewInfo'
import { CrewInfoType } from '@/type/CrewType'

export default async function CrewSetting({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    const crew: CrewInfoType = await getCrewInfo({ crewId })

    return (
        <main>
            <CrewInfo data={crew} crewId={crewId} />
        </main>
    )
}
