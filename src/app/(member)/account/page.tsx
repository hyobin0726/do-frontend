import PageHeader from '@/components/common/PageHeader'
import FindAccount from '@/components/pages/account/FindAccount'

export default function AccountPage() {
    return (
        <>
            <div className="w-[100%] h-dvh">
                <PageHeader title="계정 찾기" />
                <FindAccount />
            </div>
        </>
    )
}
