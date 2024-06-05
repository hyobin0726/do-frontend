import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

export async function useGetServerToken() {
    const session = await getServerSession(options)
    console.log('session', session)
    return session?.user?.accessToken || ''
}
