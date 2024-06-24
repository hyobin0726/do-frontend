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
            <section className="w-full h-[50px] bg-white px-3 flex items-center overflow-x-scroll scroll-smooth scrollbar-hide drop-shadow">
                <div className="flex flex-row h-[30px] w-auto space-x-3">
                    {hobbies.map((hobby: HobbyType) => (
                        <Link
                            href={`/crew?hobbyId=${hobby.hobbyId}`}
                            key={hobby.hobbyId}
                            className={`w-fit flex justify-center items-center rounded-lg ${focusedHobbyId == hobby.hobbyId ? 'bg-hobbing-red' : 'bg-hobbing-light-pink    border-[1px] border-hobbing-red'} `}
                        >
                            <p
                                className={`${focusedHobbyId == hobby.hobbyId ? 'text-white' : 'text-hobbing-red '} text-[13px] mx-2`}
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
