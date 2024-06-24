'use client'
import DeleteCrewRefuse from '@/api/crew/deleteCrewRefuse'

export default function CrewJoinRefuse({ joinFormId }: { joinFormId: string }) {
    const handleClick = async () => {
        await DeleteCrewRefuse({ joinFormId })
    }
    return (
        <section>
            <button
                onClick={() => handleClick()}
                className="w-[50px] h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
            >
                <p className="text-white text-[13px] font-bold">거절</p>
            </button>
        </section>
    )
}
