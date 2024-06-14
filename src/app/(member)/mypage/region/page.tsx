import PageHeader from '@/components/common/PageHeader'
import RegionManagement from '@/components/pages/mypage/RegionManagement'
import { useGetServerToken } from '@/actions/useGetServerToken'
import Link from 'next/link'

const getUserRegions = async (token: string) => {
    // console.log(token)
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    })
    const data = await res.json()
    return data.data
}

export default async function RegionPage() {
    const auth = await useGetServerToken()
    const userRegions = await getUserRegions(auth.token)

    return (
        <>
            <PageHeader title="활동지역 관리" />
            <RegionManagement data={userRegions} />
            <Link href={'/mypage'}>확인</Link>
        </>
    )
}
