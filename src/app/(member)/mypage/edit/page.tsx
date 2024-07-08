import { useGetServerToken } from '@/actions/useGetServerToken'

import PageHeader from '@/components/common/PageHeader'
import EditProfile from '@/components/pages/mypage/EditProfile'
import getMyProfile from '@/api/auth/getMyProfile'

export default async function EditProfilePage() {
    const auth = await useGetServerToken()
    const profileData = await getMyProfile(auth.token)

    return (
        <>
            <PageHeader />
            <EditProfile prevProfilData={profileData} />
        </>
    )
}
