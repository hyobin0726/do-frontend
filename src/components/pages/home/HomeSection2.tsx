'use client'

import { useState } from 'react'
import Link from 'next/link'

import SquidMonster from '@/components/images/monsters/SquidMonster '

interface HobbyType {
    hobbyId: number
    hobbyName: string
}

export default function HomeSection2({ hobbies }: { hobbies: HobbyType[] }) {
    const [focusedHobbyId, setFocusedHobbyId] = useState<number>(hobbies[0].hobbyId)

    return (
        <section className="w-full h-[60dvh]">
            <div className="w-full h-[120px] flex flex-col justify-end px-8">
                <div className="flex flex-row items-end">
                    <p className="text-black font-extrabold text-[35px] z-[10]">
                        우리동네 <br /> NEW 소모임
                    </p>
                    <div className="w-[50px] h-[50px]">
                        <SquidMonster />
                    </div>
                </div>
            </div>
            <div className="w-full h-[60px] flex items-center">
                <div className="w-full h-[35px] space-x-3 flex flex-row px-8 overflow-x-scroll scroll-smooth scrollbar-hide">
                    {hobbies.map((hobby: HobbyType) => (
                        <div
                            onClick={() => setFocusedHobbyId(hobby.hobbyId)}
                            key={hobby.hobbyId}
                            className={`flex-none w-auto px-5 flex justify-center items-center rounded-xl ${focusedHobbyId == hobby.hobbyId ? 'bg-hobbing-red' : 'bg-white border-[1px] border-hobbing-red'} `}
                        >
                            <p
                                className={`${focusedHobbyId == hobby.hobbyId ? 'text-white' : 'text-hobbing-red '} text-[13px]`}
                            >
                                {hobby.hobbyName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-[calc(100%-180px)] flex items-center bg-green-200">test</div>
            {/* <HomeUserHobbySwiper hobbyCardsData={hobbyCardsData} /> */}
        </section>
    )
}
