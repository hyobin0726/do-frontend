import PageHeader from '@/components/common/PageHeader'
import EditProfile from '@/components/pages/mypage/EditProfile'
import getMyProfile from '@/api/auth/getMyProfile'

export default async function EditProfilePage() {
    const profileData = await getMyProfile()

    return (
        <>
            <PageHeader />
            <EditProfile prevProfilData={profileData} />
        </>
    )
}
