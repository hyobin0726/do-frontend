import { redirect } from 'next/navigation'

import { useGetServerToken } from '@/actions/useGetServerToken'

import getBaseRegion from '@/api/crew/getBaseRegion'
import getHobbyCards from '@/api/survey/getHobbyCards'
import getNewCrew from '@/api/crew/getNewCrew'

import HomeSection1 from '@/components/pages/home/HomeSection1'
import HomeSection2 from '@/components/pages/home/HomeSection2'
import HomeSection3 from '@/components/pages/home/HomeSection3'
import getTop5Crew from '@/api/crew/getTop5Crew'

export default async function HomePage() {
    const auth = await useGetServerToken()

    if (auth) {
        const baseRegion = await getBaseRegion()
        if (!baseRegion) {
            redirect('/mypage/region/initial')
        }

        const hobbies = await getHobbyCards()
        if (!hobbies) {
            redirect('/survey?step=1&from=0')
        }

        const newCrew = await getNewCrew(hobbies[0].hobbyId, baseRegion.regionId)
        const topCrew = await getTop5Crew(baseRegion.regionId)
        return (
            <main className="w-full h-[calc(100dvh-140px)] relative overflow-y-scroll scrollbar-hide bg-hobbing-bg-gray">
                <HomeSection1 />
                <HomeSection2 hobbies={hobbies} baseRegion={baseRegion} newCrew={newCrew.data} />
                <HomeSection3 topCrew={topCrew.data} />
            </main>
        )
    }

    return (
        <>
            Not signed in <br />
        </>
    )
}
