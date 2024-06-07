import PageHeader from '@/components/common/PageHeader'
import FindPassword from '@/components/pages/account/FindPassword'

export default function ResetPwPage() {
    return (
        <>
            <PageHeader title="비밀번호 찾기" />
            <FindPassword />
        </>
    )
}
