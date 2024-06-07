import { useSession } from 'next-auth/react'

export function useGetClientToken() {
    const { data: session } = useSession()
    return session?.user?.accessToken || ''
}
