import PageHeader from '@/components/common/PageHeader'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PageHeader />
            {children}
        </>
    )
}
