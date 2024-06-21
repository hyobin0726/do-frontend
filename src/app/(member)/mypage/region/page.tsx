import PageHeader from '@/components/common/PageHeader'
import RegionManagement from '@/components/pages/mypage/RegionManagement'
import { useGetServerToken } from '@/actions/useGetServerToken'

const getUserRegions = async (token: string) => {
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
        next: { tags: ['myRegion'] },
    })
    const data = await res.json()
    return data.data
}

export default async function RegionPage() {
    const auth = await useGetServerToken()
    const userRegions = await getUserRegions(auth.token)

    return (
        <>
            <PageHeader />
            <RegionManagement data={userRegions} />
        </>
    )
}
