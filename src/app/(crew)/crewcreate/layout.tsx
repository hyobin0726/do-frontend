import PageHeader from '@/components/common/PageHeader'

export default function CrewCreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PageHeader />
            {children}
        </>
    )
}
