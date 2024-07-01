'use client'
import { CrewType } from '@/type/CrewType'
import { useState } from 'react'

export default function BoardwritingSelect({ crewList, crewId }: { crewList: CrewType[]; crewId: string }) {
    const [clicked, setClicked] = useState<string>(crewId ? crewId : crewList[0].crewId)

    const handleClick = (crewId: string) => {
        setClicked(crewId)
    }

    return (
        <section>
            <div className="bg-white space-x-2 px-2 py-1 drop-shadow-md">
                {crewList.map((crew: CrewType) => (
                    <div
                        key={crew.crewId}
                        className={`flex-none w-fit px-3 py-1 rounded-xl my-1 inline-block ${clicked == crew.crewId ? 'bg-hobbing-red' : 'bg-white border-[1px] border-hobbing-red'} `}
                        onClick={() => handleClick(crew.crewId)}
                    >
                        <p className={`${clicked == crew.crewId ? 'text-white' : 'text-hobbing-red '} text-[16px]`}>
                            {crew.name}
                        </p>
                    </div>
                ))}
            </div>
            <input type="hidden" name="crewId" value={clicked} />
        </section>
    )
}
