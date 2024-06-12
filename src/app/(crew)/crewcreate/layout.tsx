import PageHeader from '@/components/common/PageHeader'

export default function CrewCreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PageHeader title="소모임 만들기" />
            {children}
        </>
    )
}
