import { redirect } from 'next/navigation'

import { useGetServerToken } from '@/actions/useGetServerToken'

import getBaseRegion from '@/api/crew/getBaseRegion'
import getHobbyCards from '@/api/survey/getHobbyCards'
import getNewCrew from '@/api/crew/getNewCrew'

import HomeSection1 from '@/components/pages/home/HomeSection1'
import HomeSection2 from '@/components/pages/home/HomeSection2'
import HomeSection3 from '@/components/pages/home/HomeSection3'
import getTop5Crew from '@/api/crew/getTop5Crew'
import getMyProfile from '@/api/auth/getMyProfile'

const getPageData = async (token: string) => {
    const baseRegion = await getBaseRegion(token)
    if (!baseRegion) {
        redirect('/mypage/region/initial')
    }
    const hobbies = await getHobbyCards(token)
    if (!hobbies) {
        redirect('/survey?step=1&from=0')
    }
    const newCrew = await getNewCrew(hobbies[0].hobbyId, baseRegion.regionId, token)
    const topCrew = await getTop5Crew(baseRegion.regionId, token)
    const hobbyCardsData = await getHobbyCards(token)
    const profileData = await getMyProfile(token)

    return {
        baseRegion,
        hobbies,
        newCrew,
        topCrew,
        hobbyCardsData,
        profileData,
    }
}

export default async function HomePage() {
    const auth = await useGetServerToken()
    if (!auth) {
        redirect('/login')
    }
    const { baseRegion, hobbies, newCrew, topCrew, hobbyCardsData, profileData } = await getPageData(auth.token)

    return (
        <main className="w-full h-[calc(100dvh-140px)] relative overflow-y-scroll scrollbar-hide bg-hobbing-bg-gray">
            <HomeSection1 hobbyCardsData={hobbyCardsData} profileData={profileData} />
            <HomeSection2 hobbies={hobbies} baseRegion={baseRegion} newCrew={newCrew.data} token={auth.token} />
            <HomeSection3 topCrew={topCrew.data} token={auth.token} />
        </main>
    )
}
