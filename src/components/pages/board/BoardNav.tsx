'use client'
import { CrewType } from '@/type/CrewType'
import BoardCrew from './BoardCrew'
import { useRouter } from 'next/navigation'

export default function BoardNav({ crew, selectedCrewId }: { crew: CrewType[]; selectedCrewId: string }) {
    const router = useRouter()
    const handleClick = (crewId: string) => {
        router.push(`/boardlist/${crewId}?page=0`)
    }
    // console.log(selectedCrewId)

    return (
        <>
            <nav className="w-full bg-white shadow-md py-4">
                <ul className="flex overflow-x-scroll space-x-4 px-4">
                    {crew?.map((profile, index) => (
                        <BoardCrew
                            key={index}
                            profile={profile}
                            isClicked={profile.crewId == selectedCrewId}
                            onClick={() => handleClick(profile.crewId)}
                        />
                    ))}
                </ul>
            </nav>
        </>
    )
}
