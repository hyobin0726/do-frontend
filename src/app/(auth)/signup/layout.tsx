import PageHeader from '@/components/common/PageHeader'

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PageHeader />
            {children}
        </>
    )
}
