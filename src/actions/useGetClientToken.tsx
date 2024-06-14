import { useSession } from 'next-auth/react'

export function useGetClientToken() {
    const { data: session } = useSession()
    // console.log('session', session)
    const auth = {
        token: session?.user?.accessToken || '',
        uuid: session?.user?.uuid || '',
    }

    return auth
}
