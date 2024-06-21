import PageHeader from '@/components/common/PageHeader'

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PageHeader />
            {children}
        </>
    )
}
