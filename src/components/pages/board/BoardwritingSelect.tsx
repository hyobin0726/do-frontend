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
            <div className="p-2 space-y-2">
                <h1 className="text-[18px] font-medium px-1">소모임 선택</h1>
                <div className="flex space-x-1  ">
                    {crewList.map((crew: CrewType) => (
                        <div key={crew.crewId}>
                            <div
                                className={`px-3 py-1 rounded-xl ${clicked == crew.crewId ? 'bg-hobbing-red' : 'bg-white border-[1px] border-hobbing-red'} `}
                                onClick={() => handleClick(crew.crewId)}
                            >
                                <p
                                    className={`${clicked == crew.crewId ? 'text-white' : 'text-hobbing-red '} text-[16px]`}
                                >
                                    {crew.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <input type="hidden" name="crewId" value={clicked} />
        </section>
    )
}
