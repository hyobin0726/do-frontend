import PageHeader from '@/components/common/PageHeader'
import InitialRegionRegistration from '@/components/pages/region/InitialRegionRegistration'
import { useGetServerToken } from '@/actions/useGetServerToken'
import { redirect } from 'next/navigation'

const getUserRegions = async (token: string) => {
    const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`,
        },
    })
    const data = await res.json()
    return data.isSuccess
}

export default async function InitialRegionPage() {
    const auth = await useGetServerToken()
    const isUserRegionsExist = await getUserRegions(auth.token)

    if (isUserRegionsExist) {
        redirect('/mypage/region')
    }

    return (
        <>
            <PageHeader />
            <InitialRegionRegistration />
        </>
    )
}
