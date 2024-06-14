import { useGetServerToken } from '@/actions/useGetServerToken'
import { redirect } from 'next/navigation'

const getUserRegions = async (token: string) => {
    console.log('token', token)
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    })
    const data = await res.json()
    return data.status
}

export default async function HomePage() {
    // const router = useRouter()
    const auth = await useGetServerToken()
    // console.log('auth', auth)

    const userRegions = await getUserRegions(auth.token)
    console.log(userRegions)
    if (auth) {
        if (userRegions === 'REGION401') {
            // return <div className="flex flex-1 bg-fuchsia-200">지역을 등록해주세요</div>
            redirect('/mypage/region/initial')
        }
        return <div className="flex flex-1 bg-fuchsia-200">홈화면??</div>
    }
    return (
        <>
            Not signed in <br />
            {/* <button onClick={() => signIn()}>Sign in</button> */}
        </>
    )
}
