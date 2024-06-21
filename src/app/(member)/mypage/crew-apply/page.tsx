import PageHeader from '@/components/common/PageHeader'
import getMyJoinForms from '@/api/crew/getMyJoinForms'
import MyJoinForm from '@/components/pages/mypage/MyJoinForm'

export default async function CrewApplyPage() {
    const myJoinForms = await getMyJoinForms()
    return (
        <>
            <PageHeader />
            <MyJoinForm myJoinForms={myJoinForms} />
        </>
    )
}
