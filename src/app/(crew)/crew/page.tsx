import { redirect } from 'next/navigation'

import getSuggestionCrewList from '@/api/crew/getSuggestionCrewList'
import getBaseRegion from '@/api/crew/getBaseRegion'
import getHobbyCards from '@/api/survey/getHobbyCards'

import CrewInfoSlider from '@/components/pages/crew/CrewInfoSlider'
import CrewNotFound from '@/components/pages/crew/CrewNotFound'
import CrewHeader from '@/components/pages/crew/CreawHeader'

export default async function CrewPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const hobbies = await getHobbyCards()
    const region = await getBaseRegion()
    const focusedHobbyId = searchParams.hobbyId
    
    if (!focusedHobbyId) {
        return redirect(`/crew?hobbyId=${hobbies[0].hobbyId}`)
    }

    const suggestionCrewIdList = await getSuggestionCrewList(parseInt(searchParams.hobbyId), region.regionId)

    return (
        <main className="w-full h-[calc(100dvh-140px)]">
            <CrewHeader focusedHobbyId={parseInt(focusedHobbyId)} hobbies={hobbies} />
            {suggestionCrewIdList.length === 0 ? (
                <CrewNotFound hobbies={hobbies} hobbyId={parseInt(focusedHobbyId)} />
            ) : (
                <CrewInfoSlider suggestionCrewIdList={suggestionCrewIdList} />
            )}
        </main>
    )
}
