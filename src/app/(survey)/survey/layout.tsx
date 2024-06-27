import SurveyHeader from '@/components/pages/survey/SurveyHeader'

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SurveyHeader />
            {children}
        </>
    )
}
