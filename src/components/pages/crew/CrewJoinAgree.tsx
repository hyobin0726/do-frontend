'use client'
import postCrewAgree from '@/api/crew/postCrewAgree'

export default function CrewJoinAgree({ joinFormId }: { joinFormId: string }) {
    const handleClick = async () => {
        await postCrewAgree({ joinFormId })
    }
    return (
        <section>
            <button
                onClick={()=>handleClick()}
                className="w-[50px] h-[40px] bg-white border-[1px] border-hobbing-red rounded-xl flex justify-center items-center"
            >
                <p className="text-hobbing-red text-[13px] font-bold">수락</p>
            </button>
        </section>
    )
}
