import { useSession } from 'next-auth/react'

export function useGetClientToken() {
    const { data: session } = useSession()
    const auth = {
        token: session?.user?.accessToken || '',
        uuid: session?.user?.uuid || '',
    }

    return auth
}
