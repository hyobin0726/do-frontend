'use client'
import { CrewType } from '@/type/CrewType'
import BoardCrew from './BoardCrew'
import { useBoardStore } from '@/hooks/useBoardStore'

export default function BoardNav({ crew }: { crew: CrewType[] }) {
    const { selectedCrewId, setSelectedCrewId } = useBoardStore()

    // console.log('crew', selectedCrewId)

    const handleClick = (crewId: string) => {
        setSelectedCrewId(crewId)
    }

    return (
        <>
            <div className="w-full bg-white shadow-md py-4">
                <div className="flex overflow-x-scroll space-x-4 px-4">
                    {crew.map((profile, index) => (
                        <BoardCrew
                            key={index}
                            profile={profile}
                            isClicked={profile.crewId === selectedCrewId}
                            onClick={() => handleClick(profile.crewId)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
