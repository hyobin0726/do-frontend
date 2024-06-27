import QuotesRight from '@/components/images/QuotesRight'
import SurveyQuestionMonster from './SurveyQuestionMonster'
import QuotesLeft from '@/components/images/QuotesLeft'

interface surveyQuestions {
    questionId: number
    question: string
    questionType: string
}

export default function SurveyQuestions({
    surveyQuestions,
    surveyStep,
}: {
    surveyQuestions: surveyQuestions[]
    surveyStep: number
}) {
    return (
        <section className="w-full h-[50%] flex flex-col justify-end items-center ">
            <div className="relative w-full h-[100px] flex">
                <div className="w-[20px] h-[20px]">
                    <QuotesLeft />
                </div>
                <p className=" w-[calc(100%-40px)] h-full pt-4 px-2 flex justify-center text-[20px] font-bold text-center text-pretty z-[100]">
                    {surveyQuestions[surveyStep - 1].question}
                </p>
                <div className="w-[20px] h-[20px]">
                    <QuotesRight />
                </div>
            </div>
            <SurveyQuestionMonster surveyStep={surveyStep} />
        </section>
    )
}
