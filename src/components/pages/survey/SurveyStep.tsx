import BasicNextButton from '@/components/common/BasicNextButton'
import ProgressBar from '@/components/common/ProgressBar'
import RightArrow from '@/components/images/RightArrow'

interface surveyQuestions {
    questionId: number
    question: string
    questionType: string
}

export default function SurveyStep({
    surveyQuestions,
    surveyStep,
}: {
    surveyQuestions: surveyQuestions[]
    surveyStep: number
}) {
    return (
        <section className="w-full h-[25%] space-y-10">
            {surveyStep < surveyQuestions.length ? (
                <BasicNextButton path={`/survey?step=${surveyStep + 1}`} text="Next" theme="red" />
            ) : (
                <button className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8">
                    <p className="text-white text-[15px] font-bold">결과 확인</p>
                    <RightArrow width={15} height={15} />
                </button>
            )}
            <ProgressBar step={surveyStep} total={surveyQuestions.length} />
        </section>
    )
}
