import PageHeader from '@/components/common/PageHeader'
import MemberInfomation from '@/components/pages/mypage/MemberInfomation'
import getMyInfomation from '@/api/auth/getMyInfomation'

export default async function InfomationPage() {
    const signupinfo = await getMyInfomation()

    return (
        <>
            <PageHeader />
            <MemberInfomation signupinfo={signupinfo} />
        </>
    )
}
