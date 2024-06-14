import { useGetServerToken } from '@/actions/useGetServerToken'
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
        return <div className="flex flex-1 bg-fuchsia-200">홈화면??</div>
    }

    return (
        <>
            Not signed in <br />
        </>
    )
}
