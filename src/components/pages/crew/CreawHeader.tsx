import Link from 'next/link'
import { redirect } from 'next/navigation'

interface HobbyType {
    hobbyId: number
    hobbyName: string
}

export default async function CrewHeader({
    focusedHobbyId,
    hobbies,
}: {
    focusedHobbyId: number
    hobbies: HobbyType[]
}) {
    return (
        <>
            <section className="w-auto h-[55px] bg-white px-3 drop-shadow flex items-center overflow-x-scroll scroll-smooth scrollbar-hide">
                <div className="w-full h-[35px] space-x-3 flex flex-row ">
                    {hobbies.map((hobby: HobbyType) => (
                        <Link
                            href={`/crew?hobbyId=${hobby.hobbyId}`}
                            key={hobby.hobbyId}
                            className={`flex-none w-auto px-5 flex justify-center items-center rounded-xl ${focusedHobbyId == hobby.hobbyId ? 'bg-hobbing-red' : 'bg-white border-[1px] border-hobbing-red'} `}
                        >
                            <p
                                className={`${focusedHobbyId == hobby.hobbyId ? 'text-white' : 'text-hobbing-red '} text-[13px]`}
                            >
                                {hobby.hobbyName}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}
