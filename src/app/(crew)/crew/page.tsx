import Link from 'next/link'
import { redirect } from 'next/navigation'

import getSuggestionCrew from '@/api/crew/getSuggestionCrew'
import getBaseRegion from '@/api/crew/getBaseRegion'
import getHobbies from '@/api/survey/getHobbies'

import CrewInfoSlider from '@/components/pages/crew/CrewInfoSlider'
import CrewNotFount from '@/components/pages/crew/CrewNotFount'
import CrewHeader from '@/components/pages/crew/CreawHeader'
import RightArrow from '@/components/images/RightArrow'

export default async function CrewPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const hobbies = await getHobbies()
    const region = await getBaseRegion()
    const suggestionCrewIdList = await getSuggestionCrew(parseInt(searchParams.hobbyId), region.regionId)

    const focusedHobbyId = searchParams.hobbyId
    if (!focusedHobbyId) {
        return redirect(`/crew?hobbyId=${hobbies[0].hobbyId}`)
    }

    return (
        <main className="w-full h-[calc(100dvh-120px)]">
            <CrewHeader focusedHobbyId={parseInt(focusedHobbyId)} hobbies={hobbies} />

            {suggestionCrewIdList.length === 0 ? (
                <CrewNotFount hobbyId={parseInt(searchParams.hobbyId)} />
            ) : (
                <>
                    <section className="w-full h-[50px]">
                        <Link
                            href={'/crewcreate'}
                            className="w-full h-full bg-hobbing-red flex justify-between items-center px-5"
                        >
                            <p className="text-white text-[11px]">
                                원하시는 소모임이 없으신가요?
                                <br />내 취미에 맞는 소모임을 직접 만들어보세요!
                            </p>
                            <RightArrow />
                        </Link>
                    </section>
                    <CrewInfoSlider />
                </>
            )}
        </main>
    )
}
