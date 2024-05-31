'use client'
import MainNavigation from '@/components/layouts/MainNavigation'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession()
    console.log(session)
    // return (
    //     <>
    //         <div className="flex flex-1 bg-fuchsia-200">홈화면</div>
    //         <MainNavigation />
    //         {/* <TestComponent /> */}
    //     </>
    // )
    if (session) {
        return (
            <>
                <div className="flex flex-1 bg-fuchsia-200">홈화면</div>
                <MainNavigation />
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
