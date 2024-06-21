import { useGetServerToken } from '@/actions/useGetServerToken'
import HomeSection1 from '@/components/pages/home/HomeSection1'
import { redirect } from 'next/navigation'

const getUserRegions = async (token: string) => {
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    })
    const data = await res.json()
    return data.isSuccess
}

export default async function HomePage() {
    const auth = await useGetServerToken()
    const isUserRegionsExist = await getUserRegions(auth.token)
    if (auth) {
        if (!isUserRegionsExist) {
            redirect('/mypage/region/initial')
        }
        return (
            <main className="w-full h-[calc(100dvh-120px)] relative overflow-y-scroll scrollbar-hide">
                <HomeSection1 />
                <section className="absolute top-[55dvh] drop-shadow-[0_-10px_20px_rgba(0,0,0,0.2)] w-full h-[60dvh] bg-white rounded-t-3xl p-5">
                    <h1>New 소모임💫</h1>
                </section>
                <section className="absolute top-[110dvh] drop-shadow-[0_-10px_20px_rgba(0,0,0,0.2)] w-full h-[60dvh] bg-white rounded-t-3xl p-5">
                    <h1>우리동네 Hot한 소모임🔥</h1>
                </section>
            </main>
        )
    }

    return (
        <>
            Not signed in <br />
        </>
    )
}
