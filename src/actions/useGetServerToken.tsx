import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

export async function useGetServerToken() {
    const session = await getServerSession(options)
    // console.log('useGetServerToken session :', session)
    const auth = {
        token: session?.user?.accessToken || '',
        uuid: session?.user?.uuid || '',
    }

    return auth
}
