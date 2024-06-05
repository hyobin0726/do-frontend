import { useGetServerToken } from '@/actions/useGetServerToken'

export default async function HomePage() {
    const token = await useGetServerToken()
    if (token) {
        return <div className="flex flex-1 bg-fuchsia-200">홈화면</div>
    }
    return (
        <>
            Not signed in <br />
            {/* <button onClick={() => signIn()}>Sign in</button> */}
        </>
    )
}
